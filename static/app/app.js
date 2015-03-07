Ext.define('Ext.ux.NumericField', {
	extend: 'Ext.form.field.Text',
	alias: ['widget.numericfield','widget.numeric'],
	maskRe: /[0-9 .,-]/,
	fieldStyle: 'text-align: right;',

	//formatString: 'PHP 0,000.00',

	onFocus: function(){
		//this.callParent(arguments);
		this.setRawValue(this.removeFormat(this.getRawValue()));
	},

	onBlur: function(){
		//this.callParent(arguments);
		if (this.formatString) {
			this.setRawValue(this.applyFormat(this.getRawValue()));
		}
	},

	setValue: function(v){
		this.setRawValue(this.applyFormat(v));
	},
	applyFormat: function(v){
		v = v + '';
		v = v ? v.replace(/\,/g,''):v;
		return (this.formatString ? Ext.util.Format.number(v, this.formatString) : v);

	},
	removeFormat: function(v){

		var o = [];
		for(i in v){
			if(!isNaN(v[i])|| v[i] == '.' || v[i] == '-'){
				o.push(v[i]);
			}
		}
		return o.join('').trim();
	},
	processRawValue: function(val) {
		return this.removeFormat(val);
	}
});



Ext.onReady(function () {


	var currentMember;
	var user;

	// define a model for member
	Ext.define('Member', {
		extend: 'Ext.data.Model',
		fields: [
					{name: 'id', type: 'int'},
					{name: 'lastname', type: 'string'},
					{name: 'firstname', type: 'string'},
					{name: 'middlename', type: 'string'},
					{name: 'mobile', type: 'string'},
					{name: 'mobile2', type: 'string'},
					{name: 'email', type: 'string'},
					{name: 'pointsBalance', type:'int'},
					{name: 'orNumber', type: 'string'},
					{name: 'orAmount', type: 'float'},
					{name: 'cashPaid', type:'float'},
					{name: 'type', type: 'string'},
					{name: 'cardNumber', type:'string'},
					{name: 'address', type:'string'},
					{name: 'comments', type:'string'},
					{name: 'transactionDate', type: 'date', dateFormat: 'm-d-Y'},
					{name: 'transactionType', type: 'string'},
					{name: 'pointsRedeemed', type: 'int'},
					{name: 'pointsAccumulated', type: 'int'}
				],
		proxy: {
			disableCaching: true,
			type: 'rest',
			url : '/members'
		}
	});

	var loginPanel = Ext.create('Ext.form.Panel', {
		id: 'loginPanel',
        frame: true,
        title: 'Enter credentials',
        margin: 110,
        bodyPadding: 30,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtLoginUsername',
				name: 'id',
	            fieldLabel: 'Username',
				value: 'jonathan'
	        },
			{
	            xtype: 'textfield',
				id: 'txtLoginPassword',
				name: 'orNo',
	            fieldLabel: 'Password',
				inputType: 'password',
				value: 'jonathan'
	        }
		],
        buttons: [
			{
	            text: 'Login',
	            handler: function() {
					Ext.Ajax.request({
						method: 'POST',
						url: '/auth',
						params: {
							username: Ext.getCmp('txtLoginUsername').getValue(),
							password: Ext.getCmp('txtLoginPassword').getValue()
						},
						success: function(response, opts) {
							var result = Ext.decode(response.responseText);

							if(result.length == 1){
								user = result[0];
								mainPanel.switch(searchPanel);
							} else {
								Ext.MessageBox.show({
									title: 'Authentication error!',
									msg: 'Invalid username or password.',
									icon: Ext.MessageBox.WARNING,
									buttons: Ext.MessageBox.OK
								});
							}
						}
					});
	            }
	   	 	}
		],
    });


	var redeemPointsPanel = Ext.create('Ext.form.Panel', {
		id: 'redeemPointsPanel',
        frame: true,
        title: 'Process payments',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
		listeners: {
			activate: function(){

				var txtRedeemPointsTransactionDate = Ext.getCmp('txtRedeemPointsTransactionDate');
				if(user.role === 'CASHIER') {
					txtRedeemPointsTransactionDate.setReadOnly(true);
					txtRedeemPointsTransactionDate.triggers['edit'].show();
				} else {
					// SYSAD, SUPERVISOR
					txtRedeemPointsTransactionDate.setReadOnly(false);
					txtRedeemPointsTransactionDate.triggers['edit'].hide();
				}

				// get exchange rates
				this.getRate(user.dealershipCode, new Date(), function(rate){
					redeemPointsPanel.rate = rate;
				});

			}
		},
		updateConversionRateUI: function(rate){
			var type = redeemPointsPanel.getForm().getRecord().data.type;

			// reflect this in UI
			var txtConversionRate = Ext.getCmp('txtConversionRate');
			var amount = (type === 'P' ? rate.platinumElite : rate.elite);
			amount = Ext.util.Format.number(parseFloat(amount), '0,000.00');
			txtConversionRate.setText('Conversion Rate: Php ' + amount + ' = 1 point');
		},
		getRate: function(dealershipCode, transactionDate, callback){
			var me = this;
			Ext.Ajax.request({
				method: 'GET',
				url: '/util/rates',
				params: {
					dc: dealershipCode,
					td: transactionDate
				},
				success: function(response, opts) {
					var result = Ext.decode(response.responseText);
					console.log(result);

					me.updateConversionRateUI(result);


					if(callback)
						callback(result);
				}
			});
		},
        items: [
			{
	            xtype: 'textfield',
				id: 'txtRedeemPointsCardNumber',
				name: 'cardNumber',
	            fieldLabel: 'Loyalty card no',
				width: 300,
				emptyText: '0000-0000-0000-0000',
				readOnly: true
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
			            xtype: 'textfield',
						id: 'txtRedeemPointsMemberId',
						name: 'id',
			            fieldLabel: 'Member number',
						width: 200,
						readOnly: true,
						hidden: true
			        },
					{
						xtype: 'combo',
						fieldLabel: 'Type',
						editable: false,
						store: [
							['E', 'Elite'],
							['P', 'Platinum Elite']
						],
						name: 'type',
						readOnly: true,
						flex: 1
					},
					{
			            xtype: 'numericfield',
			            id: 'txtRedeemPointsPointsBalance',
						name: 'pointsBalance',
			            fieldLabel: 'Points balance',
						readOnly: true,
						labelWidth: 100,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,000'
			        }
				]
			},
			{
				xtype: 'fieldcontainer',
	            fieldLabel: 'Name',
	            layout: 'hbox',
	            defaultType: 'textfield',
	            items: [
					{
						flex: 1,
						id: 'txtRedeemPointsLastname',
		                name: 'lastname',
						emptyText: 'last name',
						readOnly: true
		            },
					{
						flex: 1,
		                name: 'firstname',
						id: 'txtRedeemPointsFirstname',
						emptyText: 'first name',
						padding: '0 5 0 5',
						readOnly: true
		            },
					{
						flex: 1,
						id: 'txtRedeemPointsMiddlename',
		                name: 'middlename',
						emptyText: 'middle name',
						readOnly: true
		            }
				]
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [

					{
			            xtype: 'textfield',
						id: 'txtRedeemPointsORNumber',
			            fieldLabel: 'OR number',
						flex: 1
			        },
					{
			            xtype: 'numericfield',
						id: 'txtRedeemPointsORAmount',
			            fieldLabel: 'OR amount',
						labelWidth: 100,
						hideTrigger: true,
						keyNavEnabled: false,
						mouseWheelEnabled: false,
						listeners: {
							change: function(){
								redeemPointsPanel.calculatePoints();
							}
						},
						flex: 1,
						padding: '0 0 0 5',
						formatString: 'Php 0,000.00'

			        }

				]
			},
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
			            xtype: 'numericfield',
						id: 'txtRedeemPointsCashPaid',
			            fieldLabel: 'Enter cash paid',
						hideTrigger: true,
						keyNavEnabled: false,
						mouseWheelEnabled: false,
						listeners: {
							change: function(){
								redeemPointsPanel.calculatePoints();
							}
						},
						flex: 1,
						formatString: 'Php 0,000.00'
			        },
					{
			            xtype: 'numericfield',
						id: 'txtRedeemPointsPointsPaid',
			            fieldLabel: 'Points paid',
						labelWidth: 100,
						readOnly: true,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,000',
						tabIndex: -1
			        }
				]
			},


			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
			            xtype: 'numericfield',
						id: 'txtRedeemPointsNewPointsBalance',
			            fieldLabel: 'New points bal.',
						width: 300,
						readOnly: true,
						formatString: '0,000'
			        },
					{
			            xtype: 'numericfield',
						id: 'txtRedeemPointsPointsEarned',
			            fieldLabel: 'Points earned',
						labelWidth: 100,
						readOnly: true,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,0000',
						tabIndex: -1
			        }

				]
			},
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
		            xtype: 'datefield',
					id: 'txtRedeemPointsTransactionDate',
		            fieldLabel: 'Transaction date',
					//hideTrigger: true,
					readOnly: true,
					value: new Date(),
					width: 300,
				    triggers: {
				        edit: {
				            cls: 'x-form-date-trigger',
							hideOnReadOnly: false,
				            onClick: function() {
								var me = this;

								var msgBox = new Ext.window.MessageBox();
								msgBox.textField.inputType = 'password';
								msgBox.prompt('Override date', 'Supervisor code:', function(btn, text){
								    if (btn == 'ok'){


										// validate code
										var code = text;

										Ext.Ajax.request({
											method: 'POST',
											url: '/auth',
											params: {
												code: code
											},
											success: function(response, opts) {
												var result = Ext.decode(response.responseText);
												console.log(result);


												if(result.length == 1){

													me.field.setReadOnly(false);
													me.field.triggers['edit'].hide();

												} else {
													Ext.MessageBox.show({
														title: 'Authentication error!',
														msg: 'Invalid approver code.',
														icon: Ext.MessageBox.WARNING,
														buttons: Ext.MessageBox.OK
													});
												}
											}
										});

								    }
								});


				            }
				        }
				    },
					listeners: {
						change: function(){
							var txtRedeemPointsTransactionDate = Ext.getCmp('txtRedeemPointsTransactionDate');
							var transactionDate = txtRedeemPointsTransactionDate.getValue();
							// update exchange rates
							redeemPointsPanel.getRate(user.dealershipCode, transactionDate, function(rate){
								redeemPointsPanel.rate = rate;

								redeemPointsPanel.updateConversionRateUI(rate);

								// recalculate points
								redeemPointsPanel.calculatePoints();
							});
						}
					}
		        },
					{
						xtype: 'combo',
						id: 'txtRedeemPointsTransactionType',
						fieldLabel: 'Transaction type',
						labelWidth: 120,
						flex: 1,
						editable: false,
						padding: '0 0 0 5',
						store: ['New vehicle', 'Parts & Service','Parts (OTC)','Gift Points','Others'],
						listeners: {
							select: function(){
								redeemPointsPanel.calculatePoints();
							}
						}
					}

				]
			},

			{
				xtype: 'label',
				id: 'txtConversionRate',
				text: ''
			}

		],
        buttons: [
			{
	            text: 'Confirm',
	            handler: function() {



					var txtRedeemPointsPointsPaid = Ext.getCmp('txtRedeemPointsPointsPaid');
					var pointsPaid = parseInt(txtRedeemPointsPointsPaid.getValue()) + 0;


					var txtRedeemPointsPointsBalance = Ext.getCmp('txtRedeemPointsPointsBalance');
					var pointsBalance = parseInt(txtRedeemPointsPointsBalance.getValue()) + 0;

					//  do not allow redemption of points if balance is less than 500
					if(pointsBalance < 500 && pointsPaid > 0)
					{
						Ext.Msg.show({
							title:'Sorry!',
							msg:'To redeem points, balance must be greater than 500 points.',
							buttons: Ext.Msg.OK,
						});
						return;
					}

					if(pointsPaid > pointsBalance)
					{
						Ext.Msg.show({
							title:'Sorry!',
							msg:'The points you\'re trying to redeem is greater than the current accumulated points.',
							buttons: Ext.Msg.OK,
						});
						return;
					}

					/*
					var txtRedeemPointsCashPaid = Ext.getCmp('txtRedeemPointsCashPaid');
					var cash = parseFloat(txtRedeemPointsCashPaid.getValue() + 0);

					var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');
					var newPoints = parseInt(txtRedeemPointsNewPointsBalance.getValue() + 0);


					if(newPoints < 500 & cash == 0)
					{
						Ext.Msg.show({
							title:'Sorry!',
							msg:'To redeem points, balance must be greater than 500 points.',
							buttons: Ext.Msg.OK,
						});
						return;
					}
					*/

					var formPanel = Ext.getCmp('redeemPointsPanel');
					var id = Ext.getCmp('txtRedeemPointsMemberId').getValue();
					formPanel.updateMember(function(){
						memberPanel.loadMember(id, function(){
							mainPanel.switch(memberPanel);
						});
					});


	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(memberPanel);
	            }
	   	 	}
		],
		updateMember: function(callback){
			var txtRedeemPointsCashPaid = Ext.getCmp('txtRedeemPointsCashPaid');
			var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');
			var txtRedeemPointsORNumber = Ext.getCmp('txtRedeemPointsORNumber');
			var txtRedeemPointsORAmount = Ext.getCmp('txtRedeemPointsORAmount');

			var txtRedeemPointsMemberId = Ext.getCmp('txtRedeemPointsMemberId');

			var txtRedeemPointsCardNumber = Ext.getCmp('txtRedeemPointsCardNumber');

			var txtRedeemPointsTransactionDate = Ext.getCmp('txtRedeemPointsTransactionDate');
			var txtRedeemPointsTransactionType = Ext.getCmp('txtRedeemPointsTransactionType');

			var txtRedeemPointsPointsPaid = Ext.getCmp('txtRedeemPointsPointsPaid');

			var txtRedeemPointsPointsBalance = Ext.getCmp('txtRedeemPointsPointsBalance');
			var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');
			var txtRedeemPointsPointsEarned = Ext.getCmp('txtRedeemPointsPointsEarned');

			//var pointsEarned = parseInt(txtRedeemPointsNewPointsBalance.getValue()) - parseInt(txtRedeemPointsPointsBalance.getValue());


			var member = Ext.create('Member', {
				id: txtRedeemPointsMemberId.getValue()
			});
			member.set('cashPaid', txtRedeemPointsCashPaid.getValue());
			member.set('pointsBalance', txtRedeemPointsNewPointsBalance.getValue());
			member.set('orNumber', txtRedeemPointsORNumber.getValue());
			member.set('orAmount', txtRedeemPointsORAmount.getValue());

			member.set('cardNumber', txtRedeemPointsCardNumber.getValue());
			member.set('transactionDate', txtRedeemPointsTransactionDate.getValue());
			member.set('transactionType', txtRedeemPointsTransactionType.getValue());
			member.set('pointsRedeemed', txtRedeemPointsPointsPaid.getValue());
			member.set('pointsAccumulated', txtRedeemPointsPointsEarned.getValue());


			member.save({
				success: function(record, operation) {

					if(callback)
						callback();

					Ext.Msg.alert({
						title: 'Status',
						msg: 'Changes saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
					});

				}
			});
		},
		loadMember: function(id, callback){
			Member.load(id, {
				success: function(record, operation) {
					this.loadRecord(record);
					this.record = record;
					if(callback)
						callback();
				},
				scope: this
			});
		},
		calculatePoints: function(){
			var txtRedeemPointsORAmount = Ext.getCmp('txtRedeemPointsORAmount');
			var txtRedeemPointsCashPaid = Ext.getCmp('txtRedeemPointsCashPaid');

			var txtRedeemPointsPointsPaid = Ext.getCmp('txtRedeemPointsPointsPaid');

			var txtRedeemPointsPointsBalance = Ext.getCmp('txtRedeemPointsPointsBalance');
			var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');

			var txtRedeemPointsPointsEarned = Ext.getCmp('txtRedeemPointsPointsEarned');

			var orAmount = parseFloat(txtRedeemPointsORAmount.getValue());
			var cash = parseFloat(txtRedeemPointsCashPaid.getValue() + 0);
			//var pointsRequired = parseInt((orAmount - cash)*100);
			var pointsPaid = parseInt(orAmount - cash);
			var pointsBalance = parseInt(txtRedeemPointsPointsBalance.getValue());


			// if E then points = cash/20
			// if P then points = cash/15
			var type = redeemPointsPanel.getForm().getRecord().data.type;


			// points exchange rate from server
			var eliteRate = redeemPointsPanel.rate.elite;
			var platinumEliteRate = redeemPointsPanel.rate.platinumElite;

			var redeemPoints = parseInt(pointsBalance - pointsPaid);

			var addPoints = parseInt((cash / (type =='P'? platinumEliteRate : eliteRate )));

			// no points earned if this is a new vehicle
			var txtRedeemPointsTransactionType = Ext.getCmp('txtRedeemPointsTransactionType');
			if(txtRedeemPointsTransactionType.getValue() === 'New vehicle'){
				var txtRedeemPointsPointsEarned = Ext.getCmp('txtRedeemPointsPointsEarned');
				addPoints = 0;
				txtRedeemPointsPointsEarned.setValue(addPoints);
			}


			var newPoints = (pointsBalance - pointsPaid) + addPoints;

			if(addPoints > 0)
				txtRedeemPointsPointsEarned.setValue(addPoints);
			if(pointsPaid >= 0)
				txtRedeemPointsPointsPaid.setValue(pointsPaid);
			if(newPoints > 0)
				txtRedeemPointsNewPointsBalance.setValue(newPoints);

		}
    });

	var memberEditPanel = Ext.create('Ext.form.Panel', {
		id: 'memberEditPanel',
        frame: true,
        title: 'Update member details',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtEditMemberCardNumber',
				name: 'cardNumber',
	            fieldLabel: 'Loyalty card no',
				width: 300,
				emptyText: '0000-0000-0000-0000',
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
			            xtype: 'textfield',
						id: 'txtEditMemberId',
						name: 'id',
			            fieldLabel: 'Member number',
						width: 200,
						readOnly: true,
						hidden: true
			        },
					{
						xtype: 'combo',
						id: 'txtEditType',
						fieldLabel: 'Type',
						editable: false,
						store: [
							['E', 'Elite'],
							['P', 'Platinum Elite']
						],
						name: 'type',
						flex: 1
					},
					{
			            xtype: 'numericfield',
			            id: 'txtEditPointsBalance',
						name: 'pointsBalance',
			            fieldLabel: 'Points balance',
						labelWidth: 100,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,000'
			        }
				]
			},
			{
				xtype: 'fieldcontainer',
	            fieldLabel: 'Name',
	            layout: 'hbox',
	            defaultType: 'textfield',

	            items: [
					{
						flex: 1,
						id: 'txtEditLastname',
		                name: 'lastname',
						emptyText: 'last name',
		            },
					{
						flex: 1,
		                name: 'firstname',
						id: 'txtEditFirstname',
						emptyText: 'first name',
						padding: '0 5 0 5'
		            },
					{
						flex: 1,
						id: 'txtEditMiddlename',
		                name: 'middlename',
						emptyText: 'middle name'
		            }
				]
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaultType: 'textfield',
				items: [
					{
						flex: 1,
						id: 'txtEditMobile',
						name: 'mobile',
						fieldLabel: 'Primary mobile'
					},
					{
						flex: 1,
						id: 'txtEditMobile2',
						name: 'mobile2',
						fieldLabel: 'Secondary mobile',
						labelWidth: 130,
						padding: '0 0 0 5'
					}
				]
			},
			{
	            xtype: 'textfield',
	            id: 'txtEditEmail',
				name: 'email',
	            fieldLabel: 'Email'
	        },
			{
				xtype: 'textarea',
				id: 'txtEditAddress',
				name: 'address',
				fieldLabel: 'Address'
			}
		],
        buttons: [
			{
	            text: 'Save',
	            handler: function() {
					var formPanel = Ext.getCmp('memberEditPanel');
					var id = Ext.getCmp('txtEditMemberId').getValue();
					formPanel.updateMember(function(){
						memberPanel.loadMember(id, function(){
							mainPanel.switch(memberPanel);
						});
					});


	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(memberPanel);
	            }
	   	 	}
		],
		loadMember: function(id, callback){
			Member.load(id, {
				success: function(record, operation) {
					this.loadRecord(record);
					this.record = record;
					if(callback)
						callback();
				},
				scope: this
			});

		},
		updateMember: function(callback){
			var formPanel = Ext.getCmp('memberEditPanel');
			var member = formPanel.record;

			formPanel.updateRecord(member);

			console.log(member);

			member.save({
				success: function(record, operation){

					if(callback)
						callback();

					Ext.Msg.alert({
						title: 'Status',
						msg: 'Changes saved successfully.',
						icon: Ext.Msg.QUESTION,
						buttons: Ext.Msg.OK,
					});
				}
			});

		}
	});

	var memberNewPanel = Ext.create('Ext.form.Panel', {
		id: 'memberNewPanel',
        frame: true,
        title: 'New member details',
        width: 340,
        bodyPadding: 20,
		autoScroll: true,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtNewCardNumber',
				name: 'cardNumber',
	            fieldLabel: 'Loyalty card no',
				width: 300,
				emptyText: '0000-0000-0000-0000',
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
						xtype: 'combo',
						id: 'cmbNewType',
						fieldLabel: 'Type',
						editable: false,
						store: [
							['E', 'Elite'],
							['P', 'Platinum Elite']
						],
						name: 'type',
						flex: 1
					},
					{
			            xtype: 'numericfield',
			            id: 'txtNewPointsBalance',
						name: 'pointsBalance',
			            fieldLabel: 'Points balance',
						labelWidth: 100,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,000'
			        }
				]
			},
			{
				xtype: 'fieldcontainer',
	            fieldLabel: 'Name',
	            layout: 'hbox',
	            defaultType: 'textfield',

	            items: [
					{
						flex: 1,
						id: 'txtNewLastname',
		                name: 'lastname',
						emptyText: 'last name',
		            },
					{
						flex: 1,
		                name: 'firstname',
						id: 'txtNewFirstname',
						emptyText: 'first name',
						padding: '0 5 0 5'
		            },
					{
						flex: 1,
						id: 'txtNewMiddlename',
		                name: 'middlename',
						emptyText: 'middle name'
		            }
				]
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaultType: 'textfield',
				items: [
					{
						flex: 1,
						id: 'txtNewMobile',
						name: 'mobile',
						fieldLabel: 'Primary mobile'
					},
					{
						flex: 1,
						id: 'txtNewMobile2',
						name: 'mobile2',
						fieldLabel: 'Secondary mobile',
						labelWidth: 130,
						padding: '0 0 0 5'
					}
				]
			},
			{
	            xtype: 'textfield',
	            id: 'txtNewEmail',
				name: 'email',
	            fieldLabel: 'Email'
	        },
			{
				xtype: 'textarea',
				id: 'txtNewAddress',
				name: 'address',
				fieldLabel: 'Address',
				emptyText: '# Street, Barangay, City, ZIP code, Province, [Country-optional]',
				rows: 1,
				height: 50
			},
			{
				xtype: 'textareafield',
				id: 'txtNewComments',
				name: 'comment',
				fieldLabel: 'Comments',
				height: 30
			}
		],
        buttons: [
			{
	            text: 'Save',
	            handler: function() {

					var newMember = Ext.create('Member', {
						lastname: Ext.getCmp('txtNewLastname').getValue(),
						firstname: Ext.getCmp('txtNewFirstname').getValue(),
						middlename: Ext.getCmp('txtNewMiddlename').getValue(),
						mobile: Ext.getCmp('txtNewMobile').getValue(),
						mobile2: Ext.getCmp('txtNewMobile2').getValue(),
						email: Ext.getCmp('txtNewEmail').getValue(),
						pointsBalance: Ext.getCmp('txtNewPointsBalance').getValue(),
						cardNumber: Ext.getCmp('txtNewCardNumber').getValue(),
						address: Ext.getCmp('txtNewAddress').getValue(),
						type: Ext.getCmp('cmbNewType').getValue(),
						comments: Ext.getCmp('txtNewComments').getValue()
					});
					newMember.save({
						success: function(record, operation) {
							var id = record.id;
							memberPanel.loadMember(id, function(){
								mainPanel.switch(memberPanel);
							});

						}
					});
	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(searchPanel);
	            }
	   	 	}
		],
		loadMember: function(id, callback){
			Member.load(id, {
				success: function(record, operation) {
					this.loadRecord(record);
					this.record = record;
					if(callback)
						callback();
				},
				scope: this
			});

		}
    });

	var memberPanel = Ext.create('Ext.form.Panel', {
		id: 'memberPanel',
        frame: true,
        title: 'Member details',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
			width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtCardNumber',
				name: 'cardNumber',
	            fieldLabel: 'Loyalty card no',
				width: 300,
				emptyText: '0000-0000-0000-0000',
				readOnly: true
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				items: [
					{
			            xtype: 'textfield',
						id: 'txtMemberId',
						name: 'id',
			            fieldLabel: 'Member number',
						width: 200,
						readOnly: true,
						hidden: true
			        },
					{
						xtype: 'combo',
						fieldLabel: 'Type',
						editable: false,
						store: [
							['E', 'Elite'],
							['P', 'Platinum Elite']
						],
						name: 'type',
						readOnly: true,
						flex: 1
					},
					{
			            xtype: 'numericfield',
			            id: 'txtPointsBalance',
						name: 'pointsBalance',
			            fieldLabel: 'Points balance',
						readOnly: true,
						labelWidth: 100,
						flex: 1,
						padding: '0 0 0 5',
						formatString: '0,000'
			        }
				]
			},
			{
				xtype: 'fieldcontainer',
	            fieldLabel: 'Name',
	            layout: 'hbox',
	            defaultType: 'textfield',

	            items: [
					{
						flex: 1,
						id: 'txtLastname',
		                name: 'lastname',
						emptyText: 'last name',
						readOnly: true
		            },
					{
						flex: 1,
		                name: 'firstname',
						id: 'txtFirstname',
						emptyText: 'first name',
						padding: '0 5 0 5',
						readOnly: true
		            },
					{
						flex: 1,
						id: 'txtMiddlename',
		                name: 'middlename',
						emptyText: 'middle name',
						readOnly: true
		            }
				]
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaultType: 'textfield',
				items: [
					{
						flex: 1,
						id: 'txtMobile',
						name: 'mobile',
						fieldLabel: 'Primary mobile'
					},
					{
						flex: 1,
						id: 'txtMobile2',
						name: 'mobile2',
						fieldLabel: 'Secondary mobile',
						labelWidth: 130,
						padding: '0 0 0 5'
					}
				]
			},
			{
	            xtype: 'textfield',
	            id: 'txtEmail',
				name: 'email',
	            fieldLabel: 'Email',
				readOnly: true
	        },
			{
				xtype: 'textarea',
				id: 'txtAddress',
				name: 'address',
				fieldLabel: 'Address',
				readOnly: true
			}
		],
        buttons: [
			{
	            text: 'Process payments',
				handler: function() {

					var id = memberPanel.getForm().getValues()['id'];

					/*
					var balance = memberPanel.getForm().getValues()['pointsBalance'];

					if(!(parseFloat(balance) >= 500)){
						Ext.Msg.show({
							title:'Sorry!',
							msg:'To redeem points, balance must be greater than 500 points.',
							buttons: Ext.Msg.OK,
						});
						return;
					}
					*/

					redeemPointsPanel.reset();
					redeemPointsPanel.loadMember(id, function(){
						mainPanel.switch(redeemPointsPanel);
					});
	            }
			},
			{
	            text: 'Transfer points',
	            handler: function() {

	            },
				hidden: true
	   	 	},
			{
	            text: 'Update details',
	            handler: function() {
					var id = this.up().up().getForm().getValues()['id'];
					memberEditPanel.loadMember(id, function(){
						mainPanel.switch(memberEditPanel);
					});

	            }
	   	 	},
			{
				xtype: 'component', flex: 1
			},
			{
	            text: 'Close',
	            handler: function() {
	                mainPanel.switch(searchPanel);
	            }
			}
		],
		loadMember: function(id, callback){
			Member.load(id, {
				success: function(record, operation) {
					this.loadRecord(record);
					this.record = record;
					if(callback)
					callback();
				},
				scope: this
			});

		}
    });

	var searchResultGrid = {
		id: 'searchResultGrid',
		xtype: 'grid',
        viewConfig: {
            emptyText: 'No images to display'
        },
        columns: [
			{
	            text: 'Last name',
	            flex: 40,
	            dataIndex: 'lastname'
	        },
			{
	            text: 'First name',
	            flex: 40,
	            dataIndex: 'firstname'
	        },
			{
	            text: 'Loyaly card no',
	            dataIndex: 'cardNumber',
	            flex: 20
        	}
		],
		store:  Ext.create('Ext.data.Store', {
		     fields: ['id', 'lastname', 'firstname']
		})
    };

	var searchResultPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        title: 'Multiple match found',
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
		},
		items: searchResultGrid,
        buttons: [
			{
	            text: 'Select',
	            handler: function() {
					// get selected member
					var grid = Ext.getCmp('searchResultGrid');
					var selection = grid.getSelectionModel().getSelection();

					if(selection.length > 0)
					{
						var id = selection[0].data.id;
						memberPanel.loadMember(id, function(){
							mainPanel.switch(memberPanel);
						});
					}
	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(searchPanel);
	            }
	   	 	}
		]
    });

	var searchPanel = Ext.create('Ext.form.Panel', {
        frame: true,
        title: 'Search members',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
			width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtSearchMemberId',
				name: 'id',
	            fieldLabel: 'Member number',
				width: 200,
				margin: '0 0 20 0',
				hidden: true
	        },
			{
	            xtype: 'textfield',
				id: 'txtSearchMemberCardNumber',
				name: 'cardNumber',
	            fieldLabel: 'Loyalty card no',
				width: 300,
				emptyText: '0000-0000-0000-0000',
				margin: '0 0 20 0',
				enableKeyEvents: true,
				listeners: {
					keypress: function(comp, e){
						if(e.charCode == 13){
							var btnSearch = Ext.getCmp('btnSearch');
							btnSearch.click();
						}

					}
				}
	        },

			{
				xtype: 'fieldcontainer',
	            fieldLabel: 'Name',
	            layout: 'hbox',
	            defaultType: 'textfield',

	            items: [
					{
						flex: 1,
						id: 'txtSearchLastname',
		                name: 'lastname',
						emptyText: 'last name',
						enableKeyEvents: true,
						listeners: {
							keypress: function(comp, e){
								if(e.charCode == 13){
									var btnSearch = Ext.getCmp('btnSearch');
									btnSearch.click();
								}

							}
						}
		            },
					{
						flex: 1,
		                name: 'firstname',
						id: 'txtSearchFirstname',
						emptyText: 'first name',
						padding: '0 5 0 5',
						enableKeyEvents: true,
						listeners: {
							keypress: function(comp, e){
								if(e.charCode == 13){
									var btnSearch = Ext.getCmp('btnSearch');
									btnSearch.click();
								}

							}
						}
		            },
					{
						flex: 1,
						id: 'txtSearchMiddlename',
		                name: 'middlename',
						emptyText: 'middle name',
						enableKeyEvents: true,
						listeners: {
							keypress: function(comp, e){
								if(e.charCode == 13){
									var btnSearch = Ext.getCmp('btnSearch');
									btnSearch.click();
								}

							}
						}
		            }
				]
	        },
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				defaultType: 'textfield',
				items: [
					{
						flex: 1,
						id: 'txtSearchMobile',
						name: 'mobile',
						fieldLabel: 'Primary mobile',
						enableKeyEvents: true,
						listeners: {
							keypress: function(comp, e){
								if(e.charCode == 13){
									var btnSearch = Ext.getCmp('btnSearch');
									btnSearch.click();
								}

							}
						}
					},
					{
						flex: 1,
						id: 'txtSearchMobile2',
						name: 'mobile2',
						fieldLabel: 'Secondary mobile',
						labelWidth: 130,
						padding: '0 0 0 5',
						enableKeyEvents: true,
						listeners: {
							keypress: function(comp, e){
								if(e.charCode == 13){
									var btnSearch = Ext.getCmp('btnSearch');
									btnSearch.click();
								}

							}
						}
					}
				]
			},
			{
	            xtype: 'textfield',
	            id: 'txtSearchEmail',
				name: 'email',
	            fieldLabel: 'Email',
				enableKeyEvents: true,
				listeners: {
					keypress: function(comp, e){
						if(e.charCode == 13){
							var btnSearch = Ext.getCmp('btnSearch');
							btnSearch.click();
						}

					}
				}
	        }
		],
        buttons: [
			{
				text: 'Add new member',
				handler: function(){
					memberNewPanel.getForm().reset();
					mainPanel.switch(memberNewPanel);
				}
			},
			{ xtype: 'component', flex: 1 },
			{
	            text: 'Search',
				id: 'btnSearch',
				handler: function(){ this.click(); },
	            click: function() {

					var params = {};
					var items = ['txtSearchMemberCardNumber', 'txtSearchLastname', 'txtSearchFirstname', 'txtSearchMiddlename','txtSearchMobile','txtSearchMobile2','txtSearchEmail'];
					for(var item in items ){
						var field = Ext.getCmp(items[item]);
						if(field.getValue())
							params[field.name] = field.getValue();
					}
					if(Object.keys(params).length > 0){

						Ext.Ajax.request({
							disableCaching: false,
							method: 'GET',
							url: '/members',
							params: params,
							success: function(response, opts) {
								var result = Ext.decode(response.responseText);

								if(result.length == 0)
									Ext.MessageBox.show({title: 'Search result', msg: 'No match found!'});

								if(result.length == 1){
									var id = result[0]['id'];
									memberPanel.loadMember(id, function(){
										mainPanel.switch(memberPanel);
									});

								}

								if(result.length > 1){
									mainPanel.switch(searchResultPanel);
									var store = Ext.getCmp('searchResultGrid').getStore();
									store.loadData(result);

								}

							}

						});
					}
	            }
       	 	},
			{
	            text: 'Reset',
	            handler: function() {
	                this.up('form').getForm().reset();
	            }
			}
		]
    });

	var mainPanel = {
		id: 'mainPanel',
		xtype: 'panel',
		title:  'Autohub Group Loyalty Program &nbsp;' + '<img style="vertical-align: bottom; height: 32px" src="/app/img/autohub.png" />',
		header: {
			items: [
				{
					xtype: 'button',
					id: 'btnLogout',
					text: 'Logout',
					scale: 'small',
					hidden: true,
		            handler: function() {
						Ext.Ajax.request({
							method: 'GET',
							url: '/auth/logout',
							success: function(response, opts) {
								var result = Ext.decode(response.responseText);
								console.log(result);
								mainPanel.switch(loginPanel);
								var txtLoginPassword = Ext.getCmp('txtLoginPassword');
								txtLoginPassword.setValue('');
							}
						});
		            }
				}

			]
		},
		width: 750,
		height: 550,
		bodyStyle: 'padding-left: 50px; padding-right: 50px; padding-top: 35px; padding-bottom: 35px;',
	    layout: 'card',
		activeItem: 0,
		items: [loginPanel, searchPanel, searchResultPanel, memberPanel, memberEditPanel],
		switch: function(panel){

			Ext.getCmp('mainPanel').getLayout().setActiveItem(panel);

			var btnLogout = Ext.getCmp('btnLogout');
			btnLogout.setHidden(panel == loginPanel);


		}
	};

	Ext.create('Ext.container.Viewport', {
		id: 'viewport',
	    layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
	    },
		items: mainPanel
	});

});
