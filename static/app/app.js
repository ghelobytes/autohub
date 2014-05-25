Ext.Loader.setConfig({ disableCaching:false });

Ext.onReady(function () {
	
	
	var currentMember;
	
	// define a model for member
	Ext.define('Member', {
		extend: 'Ext.data.Model',
		fields: [ 	
					{name: 'id', type: 'int'}, 
					{name: 'lastname', type: 'string'}, 
					{name: 'firstname', type: 'string'}, 
					{name: 'mobile', type: 'string'}, 
					{name: 'email', type: 'string'}, 
					{name: 'pointsBalance', type:'int'},
					{name: 'orNumber', type: 'string'}, 
					{name: 'orAmount', type: 'float'}, 
					{name: 'cashPaid', type:'float'} 
				],									
		proxy: {
			type: 'rest',
			url : '/members'
		}
	});

	var loginPanel = Ext.create('Ext.form.Panel', {
		id: 'loginPanel',
        frame: true,
        title: 'Enter credentials',
        margin: 110,
        bodyPadding: 10,
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
	            fieldLabel: 'Username'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtLoginPassword',
				name: 'orNo',
	            fieldLabel: 'Password',
				inputType: 'password'
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
							username: Ext.getCmp('txtLoginUsername').value,
							password: Ext.getCmp('txtLoginPassword').value
						},
						success: function(response, opts) {
							var result = Ext.decode(response.responseText);
							if(result.length == 1){
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
		]
    });
	
	
	var addPointsPanel = Ext.create('Ext.form.Panel', {
		id: 'addPointsPanel',
        frame: true,
        title: 'Add points',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				margin: '0 0 20 0',
				items: [
					{
			            xtype: 'textfield',
						id: 'txtAddPointsId',
						name: 'id',
			            fieldLabel: 'Member number',
						width: '50%',
						readOnly: true,
						width: '50%',
						margin: '0 20 0 0'
			        }, 
					{
						xtype: 'textfield',
						id: 'txtAddPointsCurrentPoints',
						name: 'pointsBalance',
						fieldLabel: 'Current points',
						readOnly: true,
						width: '50%'
					}
				]
			},
			
			{
	            xtype: 'textfield',
				id: 'txtAddPointsORNumber',
				//name: 'orNumber',
	            fieldLabel: 'Enter OR number'
	        }, 
			{
	            xtype: 'numberfield',
				id: 'txtAddPointsORAmount',
				//name: 'orAmount',
	            fieldLabel: 'Enter OR amount',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false
				
	        }, 
			{
	            xtype: 'numberfield',
				id: 'txtAddPointsCashPaid',
				//name: 'cashPaid',
	            fieldLabel: 'Enter cash paid',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				listeners: {
					change: function(){
						addPointsPanel.calculatePoints();
					}
				}
	        },
			{
	            xtype: 'numberfield',
				id: 'txtAddPointsCalculatedPoints',
	            fieldLabel: 'Calculated points',
				readOnly: true
	        },
			{
	            xtype: 'numberfield',
				id: 'txtAddPointsNewPointsBalance',
	            fieldLabel: 'New points balance',
				readOnly: true
	        },
			
		],
        buttons: [
			{
	            text: 'Confirm',
	            handler: function() {
					var formPanel = Ext.getCmp('addPointsPanel');
					var id = Ext.getCmp('txtAddPointsId').value;
					formPanel.updateMember();
					memberPanel.loadMember(id, function(){
						mainPanel.switch(memberPanel);
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
		updateMember: function(){
			var txtAddPointsCashPaid = Ext.getCmp('txtAddPointsCashPaid');
			var txtAddPointsNewPointsBalance = Ext.getCmp('txtAddPointsNewPointsBalance');
			var txtAddPointsORNumber = Ext.getCmp('txtAddPointsORNumber');
			var txtAddPointsORAmount = Ext.getCmp('txtAddPointsORAmount');
			
			var txtAddPointsId = Ext.getCmp('txtAddPointsId');
			
			var member = Ext.create('Member', {
				id: txtAddPointsId.value
			});
			member.set('cashPaid', txtAddPointsCashPaid.value);
			member.set('pointsBalance', txtAddPointsNewPointsBalance.value);
			member.set('orNumber', txtAddPointsORNumber.value);
			member.set('orAmount', txtAddPointsORAmount.value);
			
			member.save({
				success: function(record, operation) {
					
					Ext.Msg.alert({
						title: 'Status',
						msg: 'Changes saved successfully.',
						icon: Ext.Msg.QUESTION,
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
			var txtAddPointsCashPaid = Ext.getCmp('txtAddPointsCashPaid');
			var txtAddPointsCalculatedPoints = Ext.getCmp('txtAddPointsCalculatedPoints');
			
			var txtAddPointsCurrentPoints = Ext.getCmp('txtAddPointsCurrentPoints');
			var txtAddPointsNewPointsBalance = Ext.getCmp('txtAddPointsNewPointsBalance');
			
			var cash = txtAddPointsCashPaid.value;
			var points = parseInt(cash / 100);
			var newPoints = parseFloat(txtAddPointsCurrentPoints.value) + parseFloat(points);
			txtAddPointsCalculatedPoints.setValue(points);
			txtAddPointsNewPointsBalance.setValue(newPoints);
			
		}
    });
	
	var redeemPointsPanel = Ext.create('Ext.form.Panel', {
		id: 'redeemPointsPanel',
        frame: true,
        title: 'RedeemPoints',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				margin: '0 0 20 0',
				items: [
					{
			            xtype: 'textfield',
						id: 'txtRedeemPointsId',
						name: 'id',
			            fieldLabel: 'Member number',
						width: '50%',
						readOnly: true,
						width: '50%',
						margin: '0 20 0 0'
			        }, 
					{
						xtype: 'textfield',
						id: 'txtRedeemPointsCurrentPoints',
						name: 'pointsBalance',
						fieldLabel: 'Current points',
						readOnly: true,
						width: '50%'
					}
				]
			},
			
			{
	            xtype: 'textfield',
				id: 'txtRedeemPointsORNumber',
	            fieldLabel: 'Enter OR number'
	        }, 
			{
	            xtype: 'numberfield',
				id: 'txtRedeemPointsORAmount',
				//name: 'orAmount',
	            fieldLabel: 'Enter OR amount',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				listeners: {
					change: function(){
						redeemPointsPanel.calculatePoints();
					}
				}
				
	        }, 
			{
	            xtype: 'numberfield',
				id: 'txtRedeemPointsCashPaid',
				//name: 'cashPaid',
	            fieldLabel: 'Enter cash paid',
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				listeners: {
					change: function(){
						redeemPointsPanel.calculatePoints();
					}
				}
	        },
			{
	            xtype: 'numberfield',
				id: 'txtRedeemPointsPointsRequired',
	            fieldLabel: 'Points required',
				readOnly: true
	        },
			{
	            xtype: 'numberfield',
				id: 'txtRedeemPointsNewPointsBalance',
	            fieldLabel: 'New points balance',
				readOnly: true
	        },
			
		],
        buttons: [
			{
	            text: 'Confirm',
	            handler: function() {
					var formPanel = Ext.getCmp('redeemPointsPanel');
					var id = Ext.getCmp('txtRedeemPointsId').value;
					formPanel.updateMember();
					memberPanel.loadMember(id, function(){
						mainPanel.switch(memberPanel);
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
		updateMember: function(){
			var txtRedeemPointsCashPaid = Ext.getCmp('txtRedeemPointsCashPaid');
			var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');
			var txtRedeemPointsORNumber = Ext.getCmp('txtRedeemPointsORNumber');
			var txtRedeemPointsORAmount = Ext.getCmp('txtRedeemPointsORAmount');
			
			var txtRedeemPointsId = Ext.getCmp('txtRedeemPointsId');
			
			var member = Ext.create('Member', {
				id: txtRedeemPointsId.value
			});
			member.set('cashPaid', txtRedeemPointsCashPaid.value);
			member.set('pointsBalance', txtRedeemPointsNewPointsBalance.value);
			member.set('orNumber', txtRedeemPointsORNumber.value);
			member.set('orAmount', txtRedeemPointsORAmount.value);
			
			member.save({
				success: function(record, operation) {
					
					Ext.Msg.alert({
						title: 'Status',
						msg: 'Changes saved successfully.',
						icon: Ext.Msg.QUESTION,
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
			var txtRedeemPointsPointsRequired = Ext.getCmp('txtRedeemPointsPointsRequired');
			
			var txtRedeemPointsCurrentPoints = Ext.getCmp('txtRedeemPointsCurrentPoints');
			var txtRedeemPointsNewPointsBalance = Ext.getCmp('txtRedeemPointsNewPointsBalance');
			
			var orAmount = parseFloat(txtRedeemPointsORAmount.value);
			var cash = parseFloat(txtRedeemPointsCashPaid.value);
			var pointsRequired = parseInt((orAmount - cash)*100);
			var currentPoints = parseInt(txtRedeemPointsCurrentPoints.value);
			var newPoints = parseInt(currentPoints - pointsRequired);
			
			txtRedeemPointsPointsRequired.setValue(pointsRequired);
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
					id: 'txtEditMemberId',
					name: 'id',
		            fieldLabel: 'Member number',
					width: '50%',
					margin: '0 0 20 0',
					readOnly: true
		        }, 
				{
		            xtype: 'textfield',
					id: 'txtEditLastname',
					name: 'lastname',
		            fieldLabel: 'Last Name'
		        }, 
				{
		            xtype: 'textfield',
					id: 'txtEditFirstname',
					name: 'firstname',
		            fieldLabel: 'First Name'
		        }, 
				{
		            xtype: 'textfield',
					id: 'txtEditMobile',
					name: 'mobile',
		            fieldLabel: 'Mobile'
		        }, 
				{
		            xtype: 'textfield',
		            id: 'txtEditEmail',
					name: 'email',
		            fieldLabel: 'Email'
		        },
				{
		            xtype: 'textfield',
		            id: 'txtEditPointsBalance',
					name: 'pointsBalance',
		            fieldLabel: 'Points balance'
		        }
			],
	        buttons: [
				{
		            text: 'Save',
		            handler: function() {
						var formPanel = Ext.getCmp('memberEditPanel');
						var id = Ext.getCmp('txtEditMemberId').value;
						formPanel.updateMember();
						memberPanel.loadMember(id, function(){
							mainPanel.switch(memberPanel);
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
			updateMember: function(){
				var formPanel = Ext.getCmp('memberEditPanel');
				var member = formPanel.record;
				
				formPanel.updateRecord(member);
				member.save({
					success: function(record, operation){
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
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            width: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtNewLastname',
				name: 'lastname',
	            fieldLabel: 'Last Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtNewFirstname',
				name: 'firstname',
	            fieldLabel: 'First Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtNewMobile',
				name: 'mobile',
	            fieldLabel: 'Mobile'
	        }, 
			{
	            xtype: 'textfield',
	            id: 'txtNewEmail',
				name: 'email',
	            fieldLabel: 'Email'
	        },
			{
	            xtype: 'textfield',
	            id: 'txtNewPointsBalance',
				name: 'pointsBalance',
	            fieldLabel: 'Points balance'
	        }
		],
        buttons: [
			{
	            text: 'Save',
	            handler: function() {
					
					var newMember = Ext.create('Member', {
						lastname: Ext.getCmp('txtNewLastname').value,
						firstname: Ext.getCmp('txtNewFirstname').value,
						mobile: Ext.getCmp('txtNewMobile').value,
						email: Ext.getCmp('txtNewEmail').value,
						pointsBalance: null//(Ext.getCmp('txtNewPointsBalance').value === '' ? null : Ext.getCmp('txtNewPointsBalance').value)
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
				id: 'txtMemberId',
				name: 'id',
	            fieldLabel: 'Member number',
				width: '50%',
				margin: '0 0 20 0',
				readOnly: true
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtLastname',
				name: 'lastname',
	            fieldLabel: 'Last Name',
				readOnly: true
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtFirstname',
				name: 'firstname',
	            fieldLabel: 'First Name',
				readOnly: true
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtMobile',
				name: 'mobile',
	            fieldLabel: 'Mobile',
				readOnly: true
	        }, 
			{
	            xtype: 'textfield',
	            id: 'txtEmail',
				name: 'email',
	            fieldLabel: 'Email',
				readOnly: true
	        },
			{
	            xtype: 'textfield',
	            id: 'txtPointsBalance',
				name: 'pointsBalance',
	            fieldLabel: 'Points balance',
				readOnly: true
	        }
		],
        buttons: [
			{
	            text: 'Add points',
	            handler: function() {
					var id = this.up().up().getForm().getValues()['id'];
					addPointsPanel.reset();	
					addPointsPanel.loadMember(id, function(){
						mainPanel.switch(addPointsPanel);
					});
					
	            }
	   	 	},
			{
	            text: 'Redeem points',
	            handler: function() {
					var id = this.up().up().getForm().getValues()['id'];
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
	            text: 'ID',
	            dataIndex: 'id',
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
				width: '50%',
				margin: '0 0 20 0'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtSearchLastname',
				name: 'lastname',
	            fieldLabel: 'Last Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtSearchFirstname',
				name: 'firstname',
	            fieldLabel: 'First Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtSearchMobile',
				name: 'mobile',
	            fieldLabel: 'Mobile'
	        }, 
			{
	            xtype: 'textfield',
	            id: 'txtSearchEmail',
				name: 'email',
	            fieldLabel: 'Email'
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
	            handler: function() {
					
					var params = {};
					var items = ['txtSearchMemberId', 'txtSearchLastname', 'txtSearchFirstname', 'txtSearchMobile','txtSearchEmail'];
					for(var item in items ){
						var field = Ext.getCmp(items[item]);
						if(field.value)
							params[field.name] = field.value;
					}
					if(Object.keys(params).length > 0){
						Ext.Ajax.request({
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
		title: 'Autohub Group Loyalty Program',
		width: 900,
		height: 550,
	    layout: {
			type: 'card',
			defaultMargins: '50 140 50 140'
	    },
		activeItem: 0,
		items: [loginPanel, searchPanel, searchResultPanel, memberPanel, memberEditPanel, addPointsPanel],
		switch: function(panel){
			
			Ext.getCmp('mainPanel').getLayout().setActiveItem(panel);
		
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
