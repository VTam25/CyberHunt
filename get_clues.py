import sqlalchemy
import json
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

# {"gamecode": "BenTest1", "clue_num": 1}

def get_clues(request):
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
  gamecode = request_json["gamecode"]
  clue_num = request_json["clue_num"]

  stmt = sqlalchemy.text(f'SELECT text, lat, lng, num, gamecode from clues where gamecode = "{gamecode}" and num = {clue_num};')
  try:
    with db.connect() as conn:
      results = conn.execute(stmt).fetchall()
      clues = {}
      for c in results:
        clues[c[3]] = {'text': c[0], 'lat': c[1], 'lng': c[2], 'gamecode': c[4]}
  except Exception as e:
    return 'Error: {}'.format(str(e))

  return clues
