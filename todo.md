- Simple Query Params (Filters, Sorting, Limit)
- Pagination
- Actions (Methods exposed through API (Aka. Like a post))
- Modified field on put/patch
- Wrap Response

try
q:
returning specific fields based on an array not comma seperated?
a:
string or object - this means query params should be specifically designed
and presented as query params. It's justifiable :p

Query Params:
filters 	= category,author,tags ("where X == Y")
sorts		= category,author,likes ("order by X")
direction	= asc,desc ("flip the array")

limit		= ("max results returned")

pagination
2 typer

page change
	page
	perPage

infinite scroll ("load more")
	lastId
		
			
