import unittest, json
from api import app

class testApi(unittest.TestCase):

    def test_index (self):
        tester = app.test_client(self)
        response=tester.get('/')
        self.assertEqual(response.status_code, 200)

    def test_index_material(self):
        tester = app.test_client(self)
        response=tester.get('/', content_type='text')
        self.assertTrue(b'ToDo Api' in response.data)

    def test_show_tasks(self):
        tester = app.test_client()
        response=tester.get('/todo/api/v1.0/tasks',content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_add(self):
        tester = app.test_client(self)
        response = tester.post('/todo/api/v1.0/tasks/add',data=json.dumps(dict({'title':'Gym'})), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_update_tasks(self):
        tester=app.test_client(self)
        response = tester.put('/todo/api/v1.0/tasks/update/11', data= json.dumps(dict({'title':'homework'})), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_delete_task(self):
        tester=app.test_client(self)
        response = tester.delete('/todo/api/v1.0/tasks/delete/11', content_type='application/json')
        self.assertEqual(response.status_code, 200)


if __name__=='__main__':
    unittest.main()
