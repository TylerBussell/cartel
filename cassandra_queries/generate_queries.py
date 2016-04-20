import sys, time, random

float_values = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]

string_values = ['Trump','Hillary','Bernie',]

class Column:
    def __init__(self, name, colType):
        self.name = name
        self.colType = colType

class Table:
    def __init__(self, name, columns):
        self.name = name
        self.columns = columns

class Database:
    def __init__(self, keyspace, tables):
        self.keyspace = keyspace
        self.tables = tables

    def _create_insert(self, table, iteration):
        query =  'INSERT INTO ' + self.keyspace + '.' + table.name + ' ('
        for i in range(len(table.columns)):
            query += columns[i].name
            if i != len(table.columns) - 1:
                query +=  ','
        query += ') VALUES('

        for i in range(len(table.columns)):
            if columns[i].colType == 'float':
                query += str(random.choice(float_values))          
            elif columns[i].colType == 'string':
                query += '\'' + random.choice(string_values) + '\''  
            elif columns[i].colType == 'datetime':
                query += str(int(round(time.time() * 1000)) + iteration)

            if i != len(table.columns) - 1:
                query += ','

        query += ');'
        return query

    def create_insert(self, num, tableNo):
        for i in range(num):
            print(self._create_insert(self.tables[tableNo], i))

columns = []
columns.append(Column('candidate', 'string'))
columns.append(Column('created_at', 'datetime'))
columns.append(Column('sentiment', 'float'))
columns.append(Column('text', 'string'))
columns.append(Column('user', 'string'))
columns.append(Column('tid', 'string'))
table = Table('bernie', columns)
testDB = Database('db', [table])
testDB.create_insert(int(sys.argv[1]), 0)

            
