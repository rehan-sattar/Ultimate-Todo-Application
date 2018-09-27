import unittest
import json

import app


url='http://127.0.0.1:5000/api/v.1.0'
bad_url='http://localhost:5000/api/'

class TestApi(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True

    def test_get_all(self):
        """Getting All"""

        response = self.app.get(url)
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data['task']), 3)

    def test_get_one(self):
        response = self.app.get(url+'/1')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['results'][0]['name'], 'coding')

    def test_task_not_exist(self):
        response = self.app.get(url+'/2')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['results'],'no result found with 2')

    def test_bad_url(self):
        response = self.app.get(bad_url)
        self.assertEqual(response.status_code, 404)

    def test_creat_post(self):

        task = {"id":5,"name":"coding","done":"no","priority":"high","desc":"coding and coding"}
        response = self.app.post(url, data=json.dumps(task),content_type='application/json')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["results"]["name"],"coding")



    def test_error(self):
        # missing value field = bad
        task = {"id":9,"name":"work","done":"no","priority":"high","desc":"coding and coding"}
        response = self.app.post(bad_url,
                                 data=json.dumps(task),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 404)
        # value field cannot take str
        task1 = {"name":"coding","done":"no","priority":"high","desc":"coding and coding"}
        response = self.app.post(url,data=json.dumps(task1),content_type='application/json')
        self.assertEqual(response.status_code, 500)

        task2 = {"name": "coding", "priority": "high", "desc": "coding and coding"}
        response = self.app.post(url, data=json.dumps(task2), content_type='application/json')
        self.assertEqual(response.status_code, 500)

        task3 = {"id":1,"name": "coding", "done": "no" ,"desc": "coding and coding"}
        response = self.app.post(url, data=json.dumps(task3), content_type='application/json')
        self.assertEqual(response.status_code, 500)

        task4 = {"id": "1", "name": "coding", "done": "no", "desc": "coding and coding"}
        response = self.app.post(url, data=json.dumps(task4), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        task4 = {"id": 1, "name": coding, "done": "no", "desc": "coding and coding"}
        task4 = {"id": "1", "name": "coding", "done": "no", "desc": "coding and coding"}

        response = self.app.post(url, data=json.dumps(task4), content_type='application/json')
        self.assertEqual(response.status_code, 400)


def test_item_not_exist(self):
    response = self.app.get(url+'/333')
    data = json.loads(response.get_data())
    self.assertEqual(response.status_code, 200)
    self.assertEqual(data['results'],"no result found with 333")

    response = self.app.get(bad_url + '/333')
    data = json.loads(response.get_data())
    self.assertEqual(response.status_code, 404)

    def test_update(self):
        u_task={"desc": "coding and coding","done": "yes","name": "codingAND","priority": "high"}
        response = self.app.put(bad_url+'/3',data=json.dumps(u_task),content_type='application/json')
        self.assertEqual(response.status_code, 405)


        response = self.app.put(url + '/3', data=json.dumps(u_task), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data())
        self.assertEqual(data['result'],"success" )

        response = self.app.put(url + '/45', data=json.dumps(u_task), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data())
        self.assertEqual(data['result'], "failed")

        # proof need for deepcopy in setUp: update app.items should not affect self.backup_items
        # this fails when you use shallow copy
        self.assertEqual(self.backup_items[2]['value'], 20)  # org value


if __name__ == "__main__":
        unittest.main()