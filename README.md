# retort
main.js is the point application start which i set in package.json inside script array make a start :"electron ." 
the above command will able to run the application using npm start

main.js
---this is going to act as an mvc by which it only create four(4) window which are need for the application(demo) 

1-FIRST.HTML window 
  able to produce the login screen where the autenticated user can login where the unauthorized user provides an reload of the page
  
  authorized user 
  
  will direct to second.html window 
      where he has the ability to view sales data using the menu option(closing_stock,regional_sales,invoice_details,and customer_details)
      *closing_stock 
               will provide the information thus our store has (i.e) count no of the item avaible in the store 
                   TEchnical---
                              when the menu as an event for the closing_stock it will open the function with whicht the user wants to display
                              (Laboratory,Pharmaceutical,K.C.Corp) 
                              depending upon the user event the data is selected from the function and passed to the main.js and main.js will
                              render the values and passes to the second.html window
                              and the second.html window will rendere the data and show to the end user
            
      *Regional_sales
                 will provide the information regarding the terriority sales for the last month(i.e)-- provides the sum of amount of that particular terriority
                 Technical ---
                              when the menu as an event for the regional_sales it will open the function with which the user wants to display
                              (Laboratory,Pharmaceutical,K.C.Corp0
                              depending upon the user event the dat is selected from the database(last)->mysql from the function and passed to render.js using the main.js
                              thus the render page(second.html) will display all the sales for the regional sales and provides the total amount for the particaular period
      *Invoice_details
                  will provide the information regarding the invoice of the paricular industry 
                  (i.e) -> provides the details of date of the invoice and whom the invoice is generated and what are the item thus the invoice contains
                   Technical ---
                              when the menu as an event of invoice_details it will prompt the user to type the invoice-no by which the complete information regarding
                              details of the invoice is intented
                              this will check by same produce from the third.html window to main.js window the data is send (vice-versa) from third.html window to main.js window 
                              and third.html window to main.js window    
      *customer_details
                    will provide the information regarding the customer details 
                    (i.e) -> Provide the details of customer_name  , address , and many relavent information regarding the scope  the customer
                    Technical --
                             when the menu as an event of cusomte_details it will prompt the user to type the customer_no by which the complete informaiton
                             regarding the customer details will be prompted
                             
       
                              
   
                  
                              
                              
