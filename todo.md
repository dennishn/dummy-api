- CRUD User / Category (incl methods, transformers and whatnot from post)
- Tags as its own schema?
- Udate all of postman (inc multiple gets, sub folders?)

Secondary features:
- Query parameters
- Fileupload (User avatar, Post cover)
- Image API thing (w/h)
- Human error responses?
- Authentication (simple, email based)
- Authentication (advanced, oAuth based)
- User Management (merge email based account with oAuth account, reset pw)


Query Params:
filters 	= category,author,tags ("where X == Y OR/AND where Z == Q")
done	limit		= ("max results returned")
done	sort		= category,author,likes ("order by X")
			
Spørgsmål til DJ Api drengene

Hvordan ser pagination query params ud
Hvordan ser response data ud i et DELETE
Hvordan sikrer i jer at et patch er patch, og put er put
Hvordan opdeler i de to paginerings typer
Hvordan beslutter i hvilke query params der er tilgængelige (og hvor flexible gør i dem, 1000 forskellige, eller DSL)
Ville i normalt, i eks. CREATE/PUT/PATCH returnere relateret data