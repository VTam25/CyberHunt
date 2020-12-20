import sqlalchemy
# Depending on which database you are using, you'll set some variables differently. 
# In this code we are inserting only one field with one value. 
# Feel free to change the insert statement as needed for your own table's requirements.

# Uncomment and set the following variables depending on your specific instance and database:
connection_name = "cse6242-291522:us-east1:cyber-hunt"
table_name = "clues"
db_name = "cyberhunt"
db_user = "root"
db_password = ""

# If your database is MySQL, uncomment the following two lines:
driver_name = 'mysql+pymysql'
query_string = dict({"unix_socket": "/cloudsql/{}".format(connection_name)})

# {"clues":[{"clue":"test","lat":20,"lng":40,"num":1},{"clue":"test2","lat":30,"lng":-70,"num":2}]}

def save_clues(request):
    request_json = request.get_json()
    db = sqlalchemy.create_engine(
      sqlalchemy.engine.url.URL(
        drivername=driver_name,
        username=db_user,
        password=db_password,
        database=db_name,
        query=query_string,
      ),
      pool_size=5,
      max_overflow=2,
      pool_timeout=30,
      pool_recycle=1800
    )
    for cl in request_json["clues"]:
        cl_text = str(cl["clue"])
        cl_lat = float(cl["lat"])
        cl_lng = float(cl["lng"])
        cl_num = int(cl["num"])
        stmt = sqlalchemy.text(f'INSERT INTO clues (text, lat, lng, num) values ("{cl_text}", {cl_lat}, {cl_lng}, {cl_num});')
        try:
            with db.connect() as conn:
                conn.execute(stmt)
        except Exception as e:
            return 'Error: {}'.format(str(e))

    return request_json