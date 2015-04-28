- Infinite Scroll "last id" (split postman gets) (der skal sq noget orderBy igang her)
- Query parameters
- Fileupload (User avatar, Post cover)
- Image API thing (w/h)
- Human error responses?
- CRUD User / Category (incl methods, transformers and whatnot from post)
- Tags as its own schema?

Query Params:
filters 	= category,author,tags ("where X == Y OR/AND where Z == Q")
sort		= category,author,likes ("order by X")
limit		= ("max results returned")

pagination
2 typer

page change (pagination-pages.js)
	page
	perPage

infinite scroll ("load more") (pagination-infinite.js)
	lastId
		
			
Spørgsmål til DJ Api drengene

Hvordan ser pagination query params ud
Hvordan ser response data ud i et DELETE
Hvordan sikrer i jer at et patch er patch, og put er put
Hvordan opdeler i de to paginerings typer
Hvordan beslutter i hvilke query params der er tilgængelige (og hvor flexible gør i dem, 1000 forskellige, eller DSL)
Ville i normalt, i eks. CREATE/PUT/PATCH returnere relateret data