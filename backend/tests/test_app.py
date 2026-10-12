import os
import sys

from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app


client = TestClient(app)


def test_health_endpoint_returns_online_status():
    response = client.get('/api/health')

    assert response.status_code == 200
    data = response.json()
    assert data['status'] == 'online'
    assert 'active_provider' in data
    assert 'model' in data
