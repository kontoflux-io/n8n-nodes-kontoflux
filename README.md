![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# Work with your Bankaccounts via Kontoflux.io

This community package contains a node to work with the Kontoflux.io API in n8n.io.

What you get:
* Use your Bankaccounts and Transactions inside of your Automations
* Utilize the REST-API of Kontoflux to access your Accounts
* Agent Tool Usage enabled: Build your own Financial Agents with the Kontoflux Node as Tool

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Supported Operations](#supported-operations)  
[Installation](#installation)  
[Compatibility](#compatibility)  
[About](#about)  
[Version History](#version-history)  

## Supported Operations

| Operation                    | Description                                                                 | Options                                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Accounts**                |                                                                             |                                                                                                                                                                                                                                                                                                                                                                      |
| Get All Accounts            | Get all Bank Accounts with Balances and Informations                        | - BIC (`bic`) <br> - BLZ (`blz`) <br> - Return All (`returnAll`) <br> - Limit (`limit`) <br> - Offset (`offset`)                                                                                                                                                                                                                                                    |
| Get Account by Identifier   | Get a single Bank Account with Balances and Informations                    | - Account Identifier (`accountId`) – IBAN or Internal ID                                                                                                                                                                                                                                                                                                             |
| **Transactions**           |                                                                             |                                                                                                                                                                                                                                                                                                                                                                      |
| Get All Transactions        | Get all Transactions                                                        | - Return All (`returnAll`) <br> - Limit (`limit`) <br> - Offset (`offset`) <br> - Sort (`sort`) <br> - Sort By (`sortBy`) <br> - Filter: Account (`accountId`), Category (`category`), Parent Category (`parentCategory`), Valued Before/After, Booked Before/After, Imported Before/After                                                                          |
| Get Transaction by ID       | Get a single Transaction by ID                                              | - Transaction ID (`transactionId`)                                                                                                                                                                                                                                                                                                                                  |
| Search Transactions         | Search Transactions by a given search string                                | - Search String (`query`) <br> - Limit (`limit`) <br> - Offset (`offset`) <br> - Sort (`sort`) <br> - Sort By (`sortBy`) <br> - Filter: Account (`accountId`), Category (`category`), Parent Category (`parentCategory`), Valued Before/After, Booked Before/After, Imported Before/After                                                                             |
| Match Transactions          | Match Transactions with scoring by a given search string                    | - Search String (`query`) <br> - Limit (`limit`) <br> - Offset (`offset`) <br> - Filter: Account (`accountId`), Category (`category`), Parent Category (`parentCategory`), Valued Before/After, Booked Before/After, Imported Before/After                                                                                                                          |
| **Categories**             |                                                                             |                                                                                                                                                                                                                                                                                                                                                                      |
| Get All Categories          | Get all Categories                                                          | - Return All (`returnAll`) <br> - Limit (`limit`) <br> - Offset (`offset`)                                                                                                                                                                                                                                                                                           |
| Get Category by Identifier  | Get a single Category by ID                                                 | - Category ID (`categoryId`)                                                                                                                                                                                                                                                                                                                                         |

## Installation
Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.
It also should automatically install depencies (which should be the same n8n uses for handling PDFs and XML)

## How to connect your Accounts

You need to connect your Bankaccounts within our Kontoflux.io platform. We support 5000+ Banks in Germany and Austria.
Once connected, you'll be able to work with your Bankaccount within the Node, our API and Webhooks. 

## Limited Access

Please note that the Kontoflux.io Platform at this moment is only supports Bankaccounts from Germany and Austria.

## Compatibility

The Latest Version of n8n (at least 1.72.x). If you encounter any problem, feel free to [open an issue](https://github.com/geckse/n8n-nodes-einvoice) on Github. 

## About

<img src="https://cloud.let-the-work-flow.com/kontoflux-icon.png" align="left" height="64" width="64"> 
This Node is provided and supported officially by Kontoflux.io. We hope to make your Bank-Accounts more Accessable with our ready to use API.

## Version History

### 0.1.0
- initial release
