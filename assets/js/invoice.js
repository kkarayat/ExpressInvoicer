Invoice =
{
	generateInvoicePDF : function(data)
	{	
		var obj = $.parseJSON(data);
//		console.log(data);
		var cols = [];	var data = [];
		
		var title = obj.invoiceTitle === '' ? 'Invoice' : obj.invoiceTitle;
		var invfoot = obj.footer;
		var footNote = obj.footNote === '' ? '' : obj.footNote;
		var logo = 'data:image/jpeg;base64,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';
		if(obj.logo)logo=obj.logo
		
//		console.log(logo);
		$(obj.tbody).each(function(k,v)	{data.push([v.desc, v.quantity, v.unitPrice, v.total]);});

		$(obj.thead).each(function(k,v)	{cols.push(v.heading1, v.heading2, v.heading3, v.heading5);});
		
		
		var docDefinition = 
		{
			pageSize: 'A4',
			pageOrientation: 'portrait',
			pageMargins : [40,40,40,60],
			
			
			footer: function(currentPage, pageCount) 
			{ 
				return{
					stack:
					[
						{text:invfoot, alignment:'center', style:'foot'},
						{text:currentPage.toString() + ' of ' + pageCount, alignment:'center',style:'foot'},
					],
				};
				
			},
			content :
			[
				{
						text : title,
						alignment : 'center',
						fontSize: 18,
						color :'#2B3856',
						bold: true,
				},
				{
					margin: [0,30,0,0],
					columns :
					[
						{
							width:'70%',
							columns :
							[
								{
									width:'50%',
									image : logo,
									alignment : 'left',
									fit : [120,90],

								},
								{
									width:'50%',
									table:
									{
										body:
										[
											[{text:obj.companyName, style:'text'}],
											[{text:obj.add1, style:'text'}],
											[{text:obj.add2, style:'text'}],
											[{text:obj.city, style:'text'}],
											[{text:obj.phone,style:'text'}]
										]
									},
									layout: 'noBorders'
										
								}
							]	
						},
						{
							width:'30%',
							table:
							{
								widths:[80,80],
								body:
								[
									[{text:obj.invoiceLabel, style:'text'}, {text:obj.invoiceNumber,style:'text'}],
									[{text:obj.dateLabel, style:'text'}, {text:obj.date,style:'text'}],
									[{text:obj.dueDateLabel, style:'text'}, {text:obj.dueDate,style:'text'}],
									[{text:obj.amountDueLabel, style:'text'}, {text:obj.amountDue,style:'text'}],
								]
							},
							layout: 'noBorders'
						}

					]
				},
				{
					margin : [0,40,0,0],
					columns:
					[
						{
							width : '50%',
							table:
							{
								body:
								[
								 	[{text:obj.to,style:'text'}],
									[{text:obj.bcompName,style:'text'}],
									[{text:obj.baddress,style:'text'}],
									[{text:obj.bcity,style:'text'}],
									[{text:obj.bphone,style:'text'}]
								]
							},
							layout: 'noBorders'	
						},
						{
							width : '50%',
							table:
							{ 
								body:
								[
								 	[{text:obj.sto,style:'text'}],
									[{text:obj.scompName,style:'text'}],
									[{text:obj.saddress,style:'text'}],
									[{text:obj.scity,style:'text'}],
									[{text:obj.sphone,style:'text'}],
									
								]
							},
							layout: 'noBorders'	
						}
					]
				},
				{
					margin : [0,40,0,0],
					style: 'tableBody',
					table:
					{
						widths : [250, 60, 60,'*'], 
						headeRows : 1,
						body : Invoice.generateTable(data, cols),
					}
				},
				{
					margin : [0,50,0,50],
					columns :
					[
						{
							width:'60%',
							text : '',
						},
						{
							width:'40%',
							style: 'tableBody',
							table:
							{
								widths:[120,80],
								body: Invoice.generateFooterTable(obj.tfoot),

							},
							
							layout: 'noBorders'
						}

					]
				},
				{
					margins : [0,60,0,0],
					columns:
					[
					 	{width:'100%', text:footNote, style:'footNote'}
					]
					
				}

			],
			styles :
			{	
				txtHeading:
				{
					fontSize : 12,
					color : '#2B3856',
				},
				text :
				{
					fontSize : 11,
					color : '#2B3856',
				},
				tableBody :
				{
					fontSize : 11,
					color : '#2B3856',
				},
				footNote : 
				{
					alignment : 'center',
					color : '#2B3856',
					fontSize : 11,
				},
				foot :
				{
					fontSize : 8,
					color : '#2B3856',
				}
			},
		};
		console.log(docDefinition);
		pdfMake.createPdf(docDefinition).download('optionalName.pdf');
	},

	generateTable : function(data, columns)
	{
		var body = [];

	    body.push(columns);
	    
	    $(data).each(function(k,v)
	    {
	    	var dataRow = [];
	    	for(var i=0;i<columns.length;i++)
	    	{
	    		dataRow.push(v[i]);
	    	}
	    	body.push(dataRow);
	    });
	    return body;
	},

	generateFooterTable :  function(invoiceTotals)
	{
		var body = [];
		
		$.each(invoiceTotals, function(k,v)
		{
			var dataRow = [];
			for(i in v){dataRow.push(v[i]);	}
			body.push(dataRow);
		});
		
		return body;
	}

}