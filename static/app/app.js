Ext.Ajax.disableCaching = false;

Ext.onReady(function () {
	
	var currentMember;
	
	// define a model for member
	Ext.define('Member', {
		extend: 'Ext.data.Model',
		fields: [ 'id', 'lastname', 'firstname', 'mobile', 'email', 'pointsBalance' ],									
		proxy: {
			type: 'rest',
			url : '/members'
		}
	});


	var loginPanel = Ext.create('Ext.form.Panel', {
		id: 'loginPanel',
        frame: true,
        title: 'Enter credentials',
        margin: 100,
        bodyPadding: 10,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            anchor: '100%'
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
            anchor: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtAddPointsId',
				name: 'id',
	            fieldLabel: 'Member number',
				margin: '0 0 20 0',
				readOnly: true
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtAddPointsORNo',
				name: 'orNo',
	            fieldLabel: 'Enter OR number'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtAddPointsORAmount',
				name: 'orAmount',
	            fieldLabel: 'Enter OR amount'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtAddPointsCashPaid',
				name: 'cashPaid',
	            fieldLabel: 'Enter cash paid'
	        }, 
			{
	            xtype: 'textfield',
	            id: 'txtAddPointsCalculatedPoints',
				name: 'calculatedPoints',
	            fieldLabel: 'Calculated points'
	        },
			{
	            xtype: 'textfield',
	            id: 'txtAddPointsNewPointsBalance',
				name: 'newPointsBalance',
	            fieldLabel: 'New points balance'
	        }
		],
        buttons: [
			{
	            text: 'Save',
	            handler: function() {
					
	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(memberPanel);
	            }
	   	 	}
		]
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
            anchor: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtEditMemberId',
				name: 'id',
	            fieldLabel: 'Member number',
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
					memberPanel.loadMember(id);
					mainPanel.switch(memberPanel);
	            }
	   	 	},
			{
	            text: 'Cancel',
	            handler: function() {
					mainPanel.switch(memberPanel);
	            }
	   	 	}
		],
		loadMember: function(id){
			Ext.ModelManager.getModel('Member').load(id, {
				success: function(record, operation) {	
					var formPanel = Ext.getCmp('memberEditPanel');
					formPanel.loadRecord(record);
					formPanel.record = record;
				}
			});
		},
		updateMember: function(){
			var formPanel = Ext.getCmp('memberEditPanel');
			
			formPanel.getForm().updateRecord(formPanel.record);
			formPanel.record.save({
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
	
	var memberPanel = Ext.create('Ext.form.Panel', {
		id: 'memberPanel',
        frame: true,
        title: 'Member details',
        width: 340,
        bodyPadding: 20,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 120,
            anchor: '100%',
			readOnly: true
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtMemberId',
				name: 'id',
	            fieldLabel: 'Member number',
				margin: '0 0 20 0'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtLastname',
				name: 'lastname',
	            fieldLabel: 'Last Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtFirstname',
				name: 'firstname',
	            fieldLabel: 'First Name'
	        }, 
			{
	            xtype: 'textfield',
				id: 'txtMobile',
				name: 'mobile',
	            fieldLabel: 'Mobile'
	        }, 
			{
	            xtype: 'textfield',
	            id: 'txtEmail',
				name: 'email',
	            fieldLabel: 'Email'
	        },
			{
	            xtype: 'textfield',
	            id: 'txtPointsBalance',
				name: 'pointsBalance',
	            fieldLabel: 'Points balance'
	        }
		],
        buttons: [
			{
	            text: 'Add points',
	            handler: function() {
					mainPanel.switch(addPointsPanel);
	            },
				hidden: true
	   	 	},
			{
	            text: 'Redeem points',
	            handler: function() {
				
	            },
				hidden: true
	   	 	},
			{
	            text: 'Update details',
	            handler: function() {
					var id = Ext.getCmp('memberPanel').getForm().getValues()['id'];
					memberEditPanel.loadMember(id);
					mainPanel.switch(memberEditPanel);
	            }
	   	 	},
			{
	            text: 'Transfer points',
	            handler: function() {
				
	            },
				hidden: true
	   	 	},
			{
	            text: 'Close',
	            handler: function() {
	                mainPanel.switch(searchPanel);
	            }
			}
		],
		loadMember: function(id){
			Ext.ModelManager.getModel('Member').load(id, {
				success: function(record, operation) {	
					var formPanel = Ext.getCmp('memberPanel');
					formPanel.loadRecord(record);
				}
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
            anchor: '100%'
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
						memberPanel.loadMember(id);
						mainPanel.switch(memberPanel);
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
            anchor: '100%'
        },
        items: [
			{
	            xtype: 'textfield',
				id: 'txtSearchMemberId',
				name: 'id',
	            fieldLabel: 'Member number',
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
									memberPanel.loadMember(id);
									mainPanel.switch(memberPanel);
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
		title: 'AutoHub - Demo',
		width: 800,
		height: 500,
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
