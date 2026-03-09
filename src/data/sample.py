import openpyxl
from openpyxl.worksheet.table import Table
import win32com.client as win32
import time

def refresh_excel_file(excel_file_path, update_filter=True, sheet_name='Prem', filter_cell='M36'):
    """
    Refreshes all connections, queries, and pivot tables in an Excel file
    Then updates the filter to select the latest year-month
    
    Parameters:
    - excel_file_path: Full path to the Excel file (e.g., C:\\Users\\John\\data.xlsx)
    - update_filter: Boolean to enable/disable filter update (default: True)
    - sheet_name: Name of the sheet with the filter (default: 'Prem')
    - filter_cell: Cell reference for the filter (default: 'M36')
    """
    
    excel_app = None
    wb = None
    
    try:
        print(f"Opening Excel file: {excel_file_path}")
        
        # Open Excel application
        excel_app = win32.gencache.EnsureDispatch('Excel.Application')
        excel_app.Visible = False
        excel_app.DisplayAlerts = False
        excel_app.ScreenUpdating = False
        
        # Open the workbook
        wb = excel_app.Workbooks.Open(excel_file_path)
        print("✓ Excel file opened")
        
        # Step 1: Refresh all connections
        print("\n" + "="*60)
        print("STEP 1: Refreshing all connections...")
        print("="*60)
        try:
            if wb.Connections.Count > 0:
                for i, conn in enumerate(wb.Connections, 1):
                    try:
                        print(f"  Refreshing connection {i}/{wb.Connections.Count}: {conn.Name}")
                        conn.Refresh()
                    except Exception as e:
                        print(f"  ⚠ Warning for {conn.Name}: {str(e)}")
                
                # Refresh all and wait for completion
                wb.RefreshAll()
                excel_app.CalculateUntilAsyncQueriesDone()
                print("✓ All connections refreshed")
            else:
                print("  No connections found to refresh")
        except Exception as e:
            print(f"⚠ Connection refresh warning: {str(e)}")
        
        # Step 2: Wait for refresh to complete
        print("\nWaiting for background queries to complete...")
        time.sleep(3)
        
        # Step 3: Refresh all pivot tables
        print("\n" + "="*60)
        print("STEP 2: Refreshing all pivot tables...")
        print("="*60)
        total_pivots = 0
        for sheet in wb.Sheets:
            try:
                pivot_tables = sheet.PivotTables()
                if pivot_tables.Count > 0:
                    print(f"  Sheet: {sheet.Name}")
                    for pivot in pivot_tables:
                        try:
                            pivot.RefreshTable()
                            print(f"    ✓ Refreshed: {pivot.Name}")
                            total_pivots += 1
                        except Exception as e:
                            print(f"    ⚠ Could not refresh {pivot.Name}: {str(e)}")
            except:
                pass  # No pivot tables in this sheet
        
        print(f"\n✓ Total pivot tables refreshed: {total_pivots}")
        
        # Step 4: Recalculate all formulas
        print("\n" + "="*60)
        print("STEP 3: Recalculating all formulas...")
        print("="*60)
        excel_app.CalculateFull()
        print("✓ All formulas recalculated")
        
        # Step 5: Update filter to latest year-month
        if update_filter:
            print("\n" + "="*60)
            print(f"STEP 4: Updating filter in '{sheet_name}' sheet...")
            print("="*60)
            
            success = update_pivot_filter_to_latest(wb, sheet_name, filter_cell)
            
            if success:
                print("✓ Filter updated successfully")
            else:
                print("⚠ Could not update filter (see details above)")
        
        # Step 6: Save the workbook
        print("\n" + "="*60)
        print("STEP 5: Saving workbook...")
        print("="*60)
        wb.Save()
        print("✓ Workbook saved")
        
        print("\n" + "="*60)
        print("SUCCESS: All operations completed!")
        print("="*60)
        
        return True
        
    except Exception as e:
        print(f"\n{'='*60}")
        print(f"✗ ERROR: {str(e)}")
        print("="*60)
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        # Close and cleanup
        if wb:
            try:
                wb.Close(SaveChanges=True)
            except:
                pass
        
        if excel_app:
            try:
                excel_app.Quit()
            except:
                pass
        
        # Release COM objects
        del wb
        del excel_app


def update_pivot_filter_to_latest(workbook, sheet_name, filter_cell):
    """
    Updates the pivot table filter to select the latest year-month
    
    Parameters:
    - workbook: Excel workbook object
    - sheet_name: Name of the sheet containing the filter
    - filter_cell: Cell reference for the filter (e.g., 'M36')
    
    Returns:
    - True if successful, False otherwise
    """
    
    try:
        # Get the target sheet
        try:
            target_sheet = workbook.Worksheets(sheet_name)
        except:
            print(f"  ✗ Sheet '{sheet_name}' not found!")
            available_sheets = [ws.Name for ws in workbook.Worksheets]
            print(f"  Available sheets: {', '.join(available_sheets)}")
            return False
        
        print(f"  Looking for pivot table with filter at {filter_cell}...")
        
        # Find the pivot table and filter field
        pivot_table = None
        filter_field = None
        
        # Method 1: Find by filter cell location
        for pt in target_sheet.PivotTables():
            try:
                for pf in pt.PageFields():
                    filter_range = pf.LabelRange
                    cell_address = filter_range.Address.replace('$', '')
                    
                    if cell_address == filter_cell:
                        pivot_table = pt
                        filter_field = pf
                        print(f"  ✓ Found pivot table: {pt.Name}")
                        print(f"  ✓ Filter field: {pf.Name}")
                        break
                
                if pivot_table:
                    break
            except:
                continue
        
        # Method 2: If not found, look for year-month named filter
        if not filter_field:
            print(f"  Filter not found at {filter_cell}, searching by field name...")
            
            for pt in target_sheet.PivotTables():
                try:
                    for pf in pt.PageFields():
                        field_name = pf.Name.lower()
                        if any(keyword in field_name for keyword in ['year', 'month', 'date', 'period', 'yearmonth', 'year-month']):
                            pivot_table = pt
                            filter_field = pf
                            print(f"  ✓ Found year-month filter: {pf.Name} in {pt.Name}")
                            break
                    
                    if pivot_table:
                        break
                except:
                    continue
        
        if not filter_field:
            print(f"  ✗ Could not find pivot filter")
            return False
        
        # Get all available items in the filter
        print(f"  Retrieving filter values...")
        all_items = []
        
        try:
            for item in filter_field.PivotItems():
                try:
                    all_items.append(item.Name)
                except:
                    pass
        except Exception as e:
            print(f"  ✗ Error getting filter items: {str(e)}")
            return False
        
        if not all_items:
            print(f"  ✗ No items found in filter")
            return False
        
        print(f"  Found {len(all_items)} items in filter")
        
        # Sort items to find the latest
        all_items.sort()
        latest_item = all_items[-1]
        
        # Display items for debugging
        print(f"\n  Available items (showing first 5 and last 5):")
        if len(all_items) <= 10:
            for item in all_items:
                print(f"    - {item}")
        else:
            for item in all_items[:5]:
                print(f"    - {item}")
            print(f"    ... ({len(all_items) - 10} more items) ...")
            for item in all_items[-5:]:
                print(f"    - {item}")
        
        print(f"\n  Latest item identified: {latest_item}")
        
        # Update the filter to select only the latest item
        try:
            # Clear all filters first
            print(f"  Clearing current filter selection...")
            filter_field.ClearAllFilters()
            
            # Select only the latest item
            print(f"  Selecting latest item: {latest_item}")
            filter_field.CurrentPage = latest_item
            
            print(f"  ✓ Successfully updated filter to: {latest_item}")
            return True
            
        except Exception as e:
            print(f"  ✗ Error setting filter value: {str(e)}")
            
            # Alternative method: Set visible items
            try:
                print(f"  Trying alternative method...")
                for item in filter_field.PivotItems():
                    if item.Name == latest_item:
                        item.Visible = True
                    else:
                        item.Visible = False
                
                print(f"  ✓ Filter updated using alternative method")
                return True
            except Exception as e2:
                print(f"  ✗ Alternative method also failed: {str(e2)}")
                return False
        
    except Exception as e:
        print(f"  ✗ Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


# Main execution
if __name__ == "__main__":
    print("="*60)
    print("Excel Refresh and Filter Update Tool")
    print("="*60)
    
    # Get file path from user
    excel_file_path = input("\nEnter Excel file path: ").strip().strip('"')
    
    # Ask if user wants to update filter
    update_filter_input = input("\nUpdate filter to latest year-month? (Y/n): ").strip().lower()
    update_filter = update_filter_input != 'n'
    
    sheet_name = 'Sheet2'
    filter_cell = 'H18'
    
    if update_filter:
        # Optional: Allow user to customize sheet and cell
        custom = input(f"\nUse custom sheet/cell? Current: Sheet='{sheet_name}', Cell='{filter_cell}' (y/N): ").strip().lower()
        if custom == 'y':
            sheet_name = input(f"  Enter sheet name (default: {sheet_name}): ").strip() or sheet_name
            filter_cell = input(f"  Enter filter cell (default: {filter_cell}): ").strip().upper() or filter_cell
    
    print("\n" + "="*60)
    print("Starting process...")
    print("="*60)
    
    # Execute the refresh
    success = refresh_excel_file(
        excel_file_path=excel_file_path,
        update_filter=update_filter,
        sheet_name=sheet_name,
        filter_cell=filter_cell
    )
    
    # Final status
    print("\n" + "="*60)
    if success:
        print("✓ PROCESS COMPLETED SUCCESSFULLY!")
    else:
        print("✗ PROCESS FAILED - Check errors above")
    print("="*60)
    
    input("\nPress Enter to exit...")