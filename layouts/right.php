<div class="right-box">
	<div class="mar-b20" id="divInvoiceTitle">
		<div>
			<input type="text" class="form-control" name="invoice-title"
				id="invoice-title" value="INVOICE">
		</div>
	</div>
	<div class="clearfix"></div>
	<div class="mar-b20" id="divInvoiceHeader">
		<div class="col-md-6">
			<div class="col-md-4">
				<div id="logoWrapper" class="row">
					<input type="file" id="upload-logo" name="upload-logo"
						style="visibility: hidden; width: 1px; height: 1px" multiple /> <a
						href="javascript:void(0);"
						onclick="document.getElementById('upload-logo').click(); return false">
						<i class="fa fa-link fa-2x"></i>
						<div>UPLOAD LOGO</div>
						
					</a>
				</div>
			</div>
			<div class="col-md-8">
				<input type="text" class="form-control mar-t2" name="company-name" placeholder="Company Name" required/>
				<input type="text" class="form-control mar-t2" name="add-line1" placeholder="Address Line 1" required/>
				<input type="text" class="form-control mar-t2" name="add-line2" placeholder="Address Line 2" required/>
				<input type="text" class="form-control mar-t2" name="city" placeholder="City, State, ZIP Code" required/>
				<input type="number" class="form-control mar-t2" name="phone" placeholder="Phone" required/>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="col-md-6">
			<div class="table-responsive">
				<table class="table invoice-basics">
					<tbody>
						<tr>
							<td style="width: 43%;"><input type="text" class="form-control"
								name="invoice-label" value="Invoice #"></td>
							<td><input type="text" class="form-control" name="invoice-number"
								placeholder="INV00012345"></td>
						</tr>
						<tr>
							<td><input type="text" class="form-control" name="date-label"
								value="Date"></td>
							<td><input type="date" class="form-control" name="date"></td>
						</tr>
						<tr>
							<td><input type="text" class="form-control" name="due-date-label"
								value="Due Date"></td>
							<td><input type="date" class="form-control" name="due-date"></td>
						</tr>
						<tr>
							<td>
								<input type="text" class="form-control"
								name="amount-due-label" value="Amount Due"></td>
							<td>
								<div class="input-group">
									<span class="input-group-addon currency"></span> <input
										type="text" class="form-control" name="amount-due" value=""
										placeholder=0.00 disabled>
								</div>
							</td>
						</tr>

					</tbody>
				</table>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="clearfix"></div>
	<div class="mar-b20" id="divInvoiceCustomer">
		<div class="col-md-6">
			<input type="text" class="form-control mar-t2" name="billto" placeholder="Bill To"/>
			<input type="text" class="form-control mar-t2" name="bcompany-name" placeholder="Company Name"/>
			<input type="text" class="form-control mar-t2" name="baddress" placeholder="Address"/>
			<input type="text" class="form-control mar-t2" name="bcity" placeholder="City, State, ZIP Code"/>
			<input type="number" class="form-control mar-t2" name="bphone" placeholder="Phone"/>
		</div>
		<div class="col-md-6">
			<input type="text" class="form-control mar-t2" name="shipto" placeholder="Ship To"/>
			<input type="text" class="form-control mar-t2" name="scompany-name" placeholder="Company Name"/>
			<input type="text" class="form-control mar-t2" name="saddress" placeholder="Address"/>
			<input type="text" class="form-control mar-t2" name="scity" placeholder="City, State, ZIP Code"/>
			<input type="number" class="form-control mar-t2" name="sphone" placeholder="Phone"/>
			
		</div>

		<div class="clearfix"></div>
	</div>
	<div class="clearfix"></div>
	<div class="mar-b20" id="divInvoiceItemTable">
		<div class="table-responsive">
			<table class="table item-table">
				<thead>
					<tr>
						<th><a href="javascript:void(0)" class="add-line-item" alt="Add Line" title="Add Line"><i
								class="fa fa-plus fa-2x text-success"></i></a></th>
						<th><input type="text" name="heading-1"
							class="form-control" value="ITEM DESCRIPTION" style="width:300px;"></th>
						<th><input type="text" name="heading-2"
							class="form-control" value="Qty/Hrs" style="width:100px;"></th>
						<th><input type="text" name="heading-3"
							class="form-control" value="Unit Price" style="width:100px;"></th>
<!-- 						<th><input type="text" name="heading-4" -->
<!-- 							class="form-control" value="Tax" style="width:100px;"></th> -->
						<th><input type="text" name="heading-5"
							class="form-control" value="Total (Ex. Tax)" style="width:100px;"></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td colspan="2"><input type="text" name="sub-total-label"
							class="form-control" value="Sub Total (Ex. Tax)" /></td>
						<td><div class="input-group">
								<span class="input-group-addon currency">$</span><input
									type="text" name="sub-total" class="form-control"
									placeholder="0.00" disabled /></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td colspan="2"><input type="text" name="tax-total-label"
							class="form-control" value="Tax Total" /></td>
						<td><div class="input-group">
								<span class="input-group-addon currency">$</span><input
									type="text" name="tax-total" class="form-control"
									placeholder="0.00" disabled /></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td colspan="2"><input type="text" name="gross-total-label"
							class="form-control" value="Gross Total" /></td>
						<td><div class="input-group">
								<span class="input-group-addon currency">$</span><input
									type="text" name="gross-total" class="form-control"
									placeholder="0.00" disabled /></td>
					</tr>
				</tfoot>
				<tbody>
					<tr>
						<td><a href="javascript:void(0)" class="delete-line-item" alt="Delete Line" title="Delete Line"><i
								class="fa fa-trash fa-2x text-danger"></i></a></td>
						<td><input type="text" name="description" class="form-control"
							placeholder="Description/Service" /></td>
						<td><input type="number" name="quantity" class="form-control"
							placeholder="0" /></td>
						<td><div class="input-group">
								<span class="input-group-addon currency">$</span><input
									type="number" name="unit-price" class="form-control"
									placeholder="0.00" />
							</div></td>
<!-- 						<td><input type="text" name="tax" class="form-control" -->
<!-- 							placeholder="0.00" /></td> -->
						<td><div class="input-group">
								<span class="input-group-addon currency">$</span> <input
									type="text" name="total" class="form-control"
									placeholder="0.00" disabled />
							</div></td>
					</tr>

				</tbody>
			</table>
		</div>
	</div>
	<div class="mar-b20" id="invoiceNote">
		<textarea id="comments" name="comments" class="form-control">Total due in 15 days. Overdue accounts subject to a service charge of 1% per month.</textarea>
	</div>
	<div class="mar-b20 mar-t20" id="invoiceFootNote">
		<input type="text" class="form-control" name="invoice-footer"
			value="Thank you for your business">
	</div>
</div>