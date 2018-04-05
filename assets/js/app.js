
/**
 * 
 */
 CURRENCY = '';
$(document).ready(function()
{	
	var backgroundImage = BASE_URL+'/assets/image/crossword.png';
	$("body").css("background-image","url("+backgroundImage+")");

	Utils.loadCurrency();
	Utils.setInvoiceDate();
	Utils.setInvoiceDueDate();
	
	$(document).on('change','input[type="file"][name="upload-logo"]', Utils.uploadLogo);
	
	$(document).on('click','a.remove-logo', Utils.removeLogo);
	
	$(document).on('click','.add-line-item',Utils.addNewLineItem);
	$(document).on('click','.delete-line-item', Utils.deleteLineItem);
	$(document).on('change','select[name="currency"]', Utils.setCurrency);
	$(document).on('keyup','input[type="number"][name="quantity"],input[type="number"][name="unit-price"],input[type="text"][name="tax"]', Utils.lineItemTotal);
				
	$(document).on('click','button[type="button"][name="add-amt-paid"],button[type="button"][name="remove-amt-paid"]', Utils.toggleAmountPaid);
	$(document).on('click','button[type="button"][name="add-discount"],button[type="button"][name="remove-discount"]', Utils.toggleDiscount);
	$(document).on('click','button[type="button"][name="add-shipping"],button[type="button"][name="remove-shipping"]', Utils.toggleShipping);
	$(document).on('click','button[type="button"][name="add-tax"]', Utils.addTax);
	$(document).on('click','a.delete-tax', Utils.removeTax);
	
	$(document).on('keyup','input[name="amount-paid-value"], input[name="discount-value"], input[name="shipping-value"], input[name="tax-value"]', Utils.calculateTotal);
	
	$(document).on('click','button[name="download-invoice"]' ,Utils.generatePDF);
	
	$('.currency').html('INR');
});

Utils = 
{
	loadCurrency : function(e)
	{
		$.ajax
		({
			  dataType: "json",
			  url: BASE_URL+'/assets/js/currency.json',
			  data: '',
			  success: function(response)
			  {
				  $.each(response, function(i,v)
				  {
					  var option = $(document.createElement('option'));
					  option.val(i);
					  option.attr('data-currency', v.currency_code);
					  option.html(v.country+' '+' ( '+v.currency_code+' ) ');
					  if(i == 45)option.attr('selected','selected');
					  $('select[name="currency"]').append(option);
				 });
			  }
		});
	},
	
	uploadLogo : function(e)
	{
		var formData = new FormData();
	    formData.append('file', $('#upload-logo').get(0).files[0]);
	    $.ajax
		({
	        type: "POST",
	        url: BASE_URL+"/ajax.php",
	        data: formData,
	        cache: false,
	        contentType: false,
	        processData: false,
	        mimeType : "multipart/form-data",
	        
	        success: function(response)
	        {
	        	$("#logoWrapper").append(response);
				
			} 
	    });
		
	},
	
	removeLogo : function(e)
	{
		$(e.currentTarget).parents('#logoContainer').remove();	
	},
	
	addNewLineItem : function(e)
	{
		e.preventDefault();
		
		var clonedRow = $('table.item-table tbody tr:first').clone();
		clonedRow.find('input').val('');
		$('.item-table tbody').append(clonedRow);
	},
	
	deleteLineItem : function(e)
	{
		e.preventDefault();
		if($(e.currentTarget).parents('tbody').children('tr').length > 1)$(e.currentTarget).parents('tr').remove();
		else $(e.currentTarget).parents('tr').find('input').val('');
		
		Utils.calculateTotal(e);
	},
	
	setInvoiceDate : function()
	{
		var now = new Date();
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2);

		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		
		$('input[type="date"][name="date"]').val(today);
	},
	
	setInvoiceDueDate : function()
	{
		var date = new Date();
		date.setDate(date.getDate() + 15);
		
		var day = ("0" + date.getDate()).slice(-2);
		var month = ("0" + (date.getMonth() + 1)).slice(-2);

		var futureDate = date.getFullYear()+"-"+(month)+"-"+(day) ;
				
		$('input[type="date"][name="due-date"]').val(futureDate);
	},
	
	changeCurrency : function(e)
	{
		var currency = $(e.currentTarget).find('option:selected').data('currency');
		$('.currency').html(currency);
		CURRENCY = currency;
	},
	
	lineItemTotal : function(e)
	{		
		var tax = 0.00;
		var quantity = parseFloat($(e.currentTarget).parents('tr').find('input[name="quantity"]').val());
		var price = parseFloat($(e.currentTarget).parents('tr').find('input[name="unit-price"]').val());
//		var taxRate = $(e.currentTarget).parents('tr').find('input[name="tax"]').val();
//		
//		if(taxRate.indexOf('%')===-1)tax=parseFloat(taxRate);
//		else tax = price * quantity * parseFloat(taxRate)/100;
//		if(isNaN(tax))tax = 0.00;
		
//		var total = (quantity * price) + tax;
		var total = (quantity * price);
		if(isNaN(total))total = 0.00;
		
		$(e.currentTarget).parents('tr').find('input[type="text"][name="total"]').val(total.toFixed(2));
		
		Utils.calculateTotal(e);
	},
	
	toggleAmountPaid : function(e)
	{
		$(e.currentTarget).toggleClass('btn-danger');
		var name = $(e.currentTarget).attr('name');
		if(name == 'add-amt-paid')
		{
			$(e.currentTarget).attr('name','remove-amt-paid');
			$(e.currentTarget).html('<i class="fa fa-money"></i> Remove Amount Paid');
						
			var tr = $(document.createElement('tr'));
			
			tr.append
			(
				'<td colspan="2"></td>'
				+'<td colspan="2"><input type="text" class="form-control" name="amount-paid-label" value="Amount Paid"></td>'
				+'<td><input type="text" name="amount-paid-value" class="form-control  additional" placeholder="0.00"></td>'
			);
			
			$('.item-table tfoot tr:first').after(tr);
			
			
		}
		else if(name == 'remove-amt-paid')
		{
			$(e.currentTarget).attr('name','add-amt-paid');
			$(e.currentTarget).html('<i class="fa fa-money"></i> Add Amount Paid');
			
			$('input[type="text"][name="amount-paid-value"]').parents('tr').remove();
			
			Utils.calculateTotal(e);
		}
	},
	
	toggleShipping : function(e)
	{
		$(e.currentTarget).toggleClass('btn-danger');
		var name = $(e.currentTarget).attr('name');
		if(name == 'add-shipping')
		{
			$(e.currentTarget).attr('name','remove-shipping');
			$(e.currentTarget).html('<i class="fa fa-truck"></i> Remove Shipping');
						
			var tr = $(document.createElement('tr'));
			
			tr.append
			(
				'<td colspan="2"></td>'
				+'<td colspan="2"><input type="text" class="form-control" name="shipping-label" value="Shipping"></td>'
				+'<td><input type="text" name="shipping-value" class="form-control  additional" placeholder="0.00"></td>'
			);
			
			$('.item-table tfoot tr:first').after(tr);
			
			
		}
		else if(name == 'remove-shipping')
		{
			$(e.currentTarget).attr('name','add-shipping');
			$(e.currentTarget).html('<i class="fa fa-truck"></i> Add Shipping');
			
			$('input[type="text"][name="shipping-value"]').parents('tr').remove();
			
			Utils.calculateTotal(e);
		}
	},
	
	toggleDiscount : function(e)
	{
		$(e.currentTarget).toggleClass('btn-danger');
		var name = $(e.currentTarget).attr('name');
		if(name == 'add-discount')
		{
			$(e.currentTarget).attr('name','remove-discount');
			$(e.currentTarget).html('<i class="fa fa-tag"></i> Remove Discount');
			
			var tr = $(document.createElement('tr'));
			
			tr.append
			(
				'<td colspan="2"></td>'
				+'<td colspan="2"><input type="text" class="form-control" name="discount-label" value="Discount"></td>'
				+'<td><input type="text" name="discount-value" class="form-control  additional" placeholder="0.00"></td>'
			);
			
			$('.item-table tfoot tr:first').after(tr);
				
		}
		else if(name == 'remove-discount')
		{
			$(e.currentTarget).attr('name','add-discount');
			$(e.currentTarget).html('<i class="fa fa-tag"></i> Add Discount');
			
			$('input[type="text"][name="discount-value"]').parents('tr').remove();
			
			Utils.calculateTotal(e);
		}
	},
	
	addTax : function(e)
	{
		var tr = $(document.createElement('tr'));
		tr.append
		(
			'<td><a href="javascript:void(0)" class="delete-tax"><i class="fa fa-trash text-danger"></i></a></td>'
			+'<td></td>'
			+'<td colspan="2"><input type="text" class="form-control" name="tax-label" value="Tax"></td>'
			+'<td><input type="text" name="tax-value" class="form-control  additional" placeholder="0.00"></td>'
		);
		
		$('.item-table tfoot tr:first').after(tr);
		
	},
	
	removeTax : function(e)
	{
		$(e.currentTarget).parents('tr').remove();
		Utils.calculateTotal(e);
	},
	
	
	setCurrency : function()
	{
		var currency = $('select[name="currency"] option:selected').data('currency');
		$('.currency').html(currency);
	},
	
	calculateTax : function(e)
	{
		var tax = 0.00;
		var subTotal = parseFloat($('input[type="text"][name="sub-total"]').val());
		var taxRate = $(e.currentTarget).val();
		
		if(taxRate.indexOf('%')===-1)tax=parseFloat(taxRate);
		else tax = subTotal * parseFloat(taxRate)/100;
		if(isNaN(tax))tax = 0.00;
	},
	
	calculateTotal : function(e)
	{
		var subTotal = 0.00;
		$('.item-table tbody tr').each(function(k,v)
		{
			subTotal +=parseFloat($(this).find('input[type="text"][name="total"]').val());
		});
		if(isNaN(subTotal))subTotal = 0.00;
		$('input[type="text"][name="sub-total"]').val(subTotal.toFixed(2));
		
		var taxTotal = 0.00;
		var lineItemTaxTotal = 0.00;
		$('.item-table tbody tr').each(function(k,v)
		{
			var tax = 0.00;
			var quantity = parseFloat($(this).find('input[name="quantity"]').val());
			var price = parseFloat($(this).find('input[name="unit-price"]').val());
			var taxRate = $(this).find('input[name="tax"]').val();
			
//			if(taxRate.indexOf('%')===-1)tax=parseFloat(taxRate);
//			else tax = price * quantity * parseFloat(taxRate)/100;
//			if(isNaN(tax))tax = 0.00;
			
			lineItemTaxTotal += tax;
		});
		
		var additionalTaxTotal = 0.00;
		
		if($('input[type="text"][name="tax-value"]').length)
		{
			$('input[type="text"][name="tax-value"]').each(function(k,v){
				var tax = 0.00;
				
				var taxRate = $(this).val();
				
				if(taxRate.indexOf('%')===-1)tax=parseFloat(taxRate);
				else tax = subTotal * parseFloat(taxRate)/100;
				if(isNaN(tax))tax = 0.00;
				
				additionalTaxTotal += tax;
			});
		}
				
		taxTotal = additionalTaxTotal + lineItemTaxTotal ;
		$('input[type="text"][name="tax-total"]').val(taxTotal.toFixed(2));
		
		var shipping = 0.00;
		if($('input[name="shipping-value"]').length)
		{
			var shippingRate = $('input[type="text"][name="shipping-value"]').val();
			if (shippingRate.indexOf('%') === -1) shipping = parseFloat(shippingRate);
			else shipping = subTotal * parseFloat(shippingRate)/100;
			if (isNaN(shipping)) shipping = 0;
		}
		
		var discount = 0.00;
		if($('input[name="discount-value"]').length)
		{
			var discountRate = $('input[type="text"][name="discount-value"]').val();
			if (discountRate.indexOf('%') === -1) discount = parseFloat(discountRate);
			else discount = subTotal * parseFloat(discountRate)/100;
			if (isNaN(discount)) discount = 0;
		}
						
		var grossTotal = (subTotal + taxTotal + shipping)-discount;
		$('input[type="text"][name="gross-total"]').val(grossTotal.toFixed(2));
		
		var amountPaid = 0.00;
		if($('input[name="amount-paid-value"]').length)
		{
			var amountPaidRate = $('input[type="text"][name="amount-paid-value"]').val();
			if (amountPaidRate.indexOf('%') === -1) amountPaid = parseFloat(amountPaidRate);
			else amountPaid = grossTotal * parseFloat(amountPaidRate)/100;
			if (isNaN(amountPaid)) amountPaid = 0;
		}
		
		var amountDue = grossTotal - amountPaid;
		$('input[type="text"][name="amount-due"]').val(amountDue.toFixed(2));
		
		if(grossTotal != null || grossTotal != '') $('button[type="button"][name="download-invoice"]').prop('disabled', false);
		else $('button[type="button"][name="download-invoice"]').prop('disabled', true);
			
	},
	
	formatCurrency : function(amount)
	{
		var currency = $('select[name="currency"] option:selected').data('currency');
		return currency +' '+ amount;
	},
	
	generatePDF :  function(e)
	{
		invoiceObj = new Object();

		invoiceObj.invoiceTitle = $('input[type="text"][name="invoice-title"]').val();
		invoiceObj.companyName = $('input[type="text"][name="company-name"]').val();
		invoiceObj.add1 = $('input[type="text"][name="add-line1"]').val();
		invoiceObj.add2 = $('input[type="text"][name="add-line2"]').val();
		invoiceObj.city = $('input[type="text"][name="city"]').val();
		invoiceObj.phone = $('input[type="number"][name="phone"]').val();
		invoiceObj.logo = $('img[name="comp-logo"]').data('image-uri');
		
		invoiceObj.invoiceLabel = $('input[type="text"][name="invoice-label"]').val()
		invoiceObj.invoiceNumber = $('input[type="text"][name="invoice-number"]').val();
		
		invoiceObj.dateLabel = $('input[type="text"][name="date-label"]').val();
		invoiceObj.date = $('input[type="date"][name="date"]').val();
		
		invoiceObj.dueDateLabel = $('input[type="text"][name="due-date-label"]').val();
		invoiceObj.dueDate = $('input[type="date"][name="due-date"]').val();
		
		invoiceObj.amountDueLabel = $('input[type="text"][name="amount-due-label"]').val();
		invoiceObj.amountDue = Utils.formatCurrency($('input[type="text"][name="amount-due"]').val());
		
		invoiceObj.to = $('input[type="text"][name="billto"]').val();
		invoiceObj.bcompName = $('input[type="text"][name="bcompany-name"]').val();
		invoiceObj.baddress= $('input[type="text"][name="baddress"]').val();
		invoiceObj.bcity = $('input[type="text"][name="bcity"]').val(); 
		invoiceObj.bphone = $('input[type="number"][name="bphone"]').val();
		
		invoiceObj.sto = $('input[type="text"][name="shipto"]').val();
		invoiceObj.scompName = $('input[type="text"][name="scompany-name"]').val();
		invoiceObj.saddress= $('input[type="text"][name="saddress"]').val();
		invoiceObj.scity = $('input[type="text"][name="scity"]').val(); 
		invoiceObj.sphone = $('input[type="number"][name="sphone"]').val();

		invoiceObj.footNote = $('textarea[name="comments"]').val();
		invoiceObj.footer = $('input[type="text"][name="invoice-footer"]').val();
		
		
//		getting table headers
		var tableHeading = [];
		
		$('table.item-table').find('thead tr').each(function(k,v){
			tableHeading.push({
				"heading1" : $(this).find('input[type="text"][name="heading-1"]').val(),
				"heading2" : $(this).find('input[type="text"][name="heading-2"]').val(),
				"heading3" : $(this).find('input[type="text"][name="heading-3"]').val(),
//				"heading4" : $(this).find('input[type="text"][name="heading-4"]').val(),
				"heading5" : $(this).find('input[type="text"][name="heading-5"]').val(),
			});
			
		});
		
		invoiceObj.thead = tableHeading;
//		getting table body contents
		var tableBody = []
		$('table.item-table').find('tbody tr').each(function(k,v){
			tableBody.push({
				"desc" : $(this).find('input[type="text"][name="description"]').val(),
				"quantity" : $(this).find('input[type="number"][name="quantity"]').val(),
				"unitPrice" : $(this).find('input[type="number"][name="unit-price"]').val(),
//				"tax" : $(this).find('input[type="text"][name="tax"]').val(),
				"total" : $(this).find('input[type="text"][name="total"]').val(),
			});
			
		});
		invoiceObj.tbody = tableBody;
//		getting table footer contents
		var tableFoot = [];

		$('table.item-table').find('tfoot tr').each(function(k,v)
		{
			stv = $(v).find('input[type="text"][name="sub-total"]').val();
			if(stv!= null)stv = Utils.formatCurrency(stv);
			
			ttv = $(v).find('input[type="text"][name="tax-total"]').val();
			if(ttv != null)ttv = Utils.formatCurrency(ttv);
			
			gtv = $(v).find('input[type="text"][name="gross-total"]').val();
			if(gtv != null)gtv = Utils.formatCurrency(gtv);
			
			tableFoot.push({
				"stl" : $(v).find('input[type="text"][name="sub-total-label"]').val(),
				"stv" : stv,
				"ttl" : $(v).find('input[type="text"][name="tax-total-label"]').val(),
				"ttv" : ttv,
				"gtl" : $(v).find('input[type="text"][name="gross-total-label"]').val(),
				"gtv" : gtv,
				"tl" : $(v).find('input[type="text"][name="tax-label"]').val(),
				"tv" : $(v).find('input[type="text"][name="tax-value"]').val(),
				"apl" : $(v).find('input[type="text"][name="amount-paid-label"]').val(),
				"apv" : $(v).find('input[type="text"][name="amount-paid-value"]').val(),
				"dl" : $(v).find('input[type="text"][name="discount-label"]').val(),
				"dv" : $(v).find('input[type="text"][name="discount-value"]').val(),
				"sl" : $(v).find('input[type="text"][name="shipping-label"]').val(),
				"sv" : $(v).find('input[type="text"][name="shipping-value"]').val(),
				
			});	
		});
		invoiceObj.tfoot = tableFoot;
		
		var requestData = JSON.stringify(invoiceObj);
		console.log(requestData);
		Invoice.generateInvoicePDF(requestData);
		
		
	}
	
}