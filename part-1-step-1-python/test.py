
import unittest
import json
import app


url='http://127.0.0.1:5000/api/v.1.0'
bad_url='http://localhost:5000/api/'





class TestApi(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True



    def test_create_task(self):
        task = {"id":1,"name":"coding","done":"no","priority":"high","desc":"coding and coding"}
        response = self.app.post(url, data=json.dumps(task),content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = self.app.put(url, data=json.dumps(task), content_type='application/json')
        self.assertEqual(response.status_code, 405)

        response = self.app.delete(url, data=json.dumps(task), content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_get_all(self):
        """Getting All"""
        response = self.app.get(url)
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data['task']), app.todo.count())

        response = self.app.put(url)
        self.assertEqual(response.status_code, 405)

        response = self.app.patch(url)
        self.assertEqual(response.status_code, 405)



    def test_get_one(self):
         response = self.app.put(url+'/1')
         self.assertEqual(response.status_code, 500)

         response = self.app.post(url + '/1')
         self.assertEqual(response.status_code, 405 )

         response = self.app.get(url + '/1')
         self.assertEqual(response.status_code, 200)


#
    def test_task_not_exist(self):
        response = self.app.get(bad_url+'/2')
        self.assertEqual(response.status_code, 404)

        response=self.app.get(url+'/999')
        data = json.loads(response.get_data())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['results'],'no result found with 999')



    def test_bad_url(self):
        response = self.app.get(bad_url)
        self.assertEqual(response.status_code, 404)

        response = self.app.get(bad_url+'/2')
        self.assertEqual(response.status_code, 404)

        response = self.app.put(bad_url + '/2')
        self.assertEqual(response.status_code, 404)

        response = self.app.delete(bad_url + '/3')
        self.assertEqual(response.status_code, 404)

        response = self.app.post(bad_url + '/2')
        self.assertEqual(response.status_code, 404)

    def test_find_one(self):
        response = self.app.get(url + '/1')
        self.assertEqual(response.status_code, 200)
        data1 = json.loads(response.get_data())
        self.assertEqual(data1["results"][0]["name"], "coding")

        response = self.app.get(url + '/1')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(data1["results"][0]["name"], "aaaaa")


    def test_completed(self):
        response = self.app.get(url+'/completed')
        data = json.loads(response.get_data())
        self.assertEqual(data["results"],"No task completed yet")

        response = self.app.put(url+'/completed')
        self.assertEqual(response.status_code,405)

        response = self.app.post(url + '/completed')
        self.assertEqual(response.status_code, 405)

        response = self.app.delete(url+'/completed')
        self.assertEqual(response.status_code, 405)


        response = self.app.delete(bad_url+'/completed')
        self.assertEqual(response.status_code, 404)

    def test_inompleted(self):
        response = self.app.get(url+'/uncompleted')
        data = json.loads(response.get_data())
        self.assertEqual(data["incomplete Task"][0]["done"],"no")

        response = self.app.put(url+'/uncompleted')
        self.assertEqual(response.status_code,405)

        response = self.app.post(url + '/uncompleted')
        self.assertEqual(response.status_code, 405)

        response = self.app.delete(url+'/uncompleted')
        self.assertEqual(response.status_code, 405)


        response = self.app.delete(bad_url+'/uncompleted')
        self.assertEqual(response.status_code, 404)





    def test_update(self):
        task={"desc": "coding and coding","done": "no","name": "update","priority": "low"}
        response = self.app.put(url+'/8',data=json.dumps(task),content_type='application/json')
        data1 = json.loads(response.get_data())
        self.assertEqual(data1["result"],  "success")
        self.assertEqual(response.status_code, 200)

        response = self.app.put(url+'/222',data=json.dumps(task),content_type='application/json')
        data1 = json.loads(response.get_data())
        self.assertEqual(data1["result"],  "failed")
        self.assertEqual(response.status_code, 200)

        response = self.app.put(bad_url + '/222', data=json.dumps(task), content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_delete(self):

        response = self.app.delete(url +'/2')
        data=json.loads(response.get_data())
        self.assertEqual(data["result"],"record deleted")
        self.assertEqual(response.status_code, 200)

        response = self.app.delete(url+'/222')
        data1 = json.loads(response.get_data())
        self.assertEqual(data1["result"], "No record deleted")
        self.assertEqual(response.status_code, 200)

        response = self.app.delete(bad_url+'/222')
        self.assertEqual(response.status_code, 404)



if __name__ == "__main__":
    unittest.main()