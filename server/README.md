# Backend Documentation

## 1. Patients API
### GET /patients

Description: Retrieve a list of all patients.
Query Parameters:
gender (optional): Filter patients by gender.
language (optional): Filter patients by language.
Response:
json
Copy code
[
  {
    "patient_id": 709,
    "first_name": "Ab",
    "last_name": "McGonigle",
    "date_of_birth": "1979-12-10",
    "gender": "Male",
    "language": "English"
  },
  ...
]
GET /patients/

Description: Retrieve details of a specific patient by ID.
Path Parameters:
id: Patient ID.
Response:
json
Copy code
{
  "patient_id": 709,
  "first_name": "Ab",
  "last_name": "McGonigle",
  "date_of_birth": "1979-12-10",
  "gender": "Male",
  "language": "English"
}
POST /patients

Description: Add a new patient.
Request Body:
json
Copy code
{
  "first_name": "Ab",
  "last_name": "McGonigle",
  "date_of_birth": "1979-12-10",
  "gender": "Male",
  "language": "English"
}
Response:
json
Copy code
{
  "patient_id": 710,
  "message": "Patient created successfully."
}
PUT /patients/

Description: Update an existing patient's details.
Path Parameters:
id: Patient ID.
Request Body: (Similar to POST)
Response:
json
Copy code
{
  "message": "Patient updated successfully."
}
DELETE /patients/

Description: Delete a patient by ID.
Path Parameters:
id: Patient ID.
Response:
json
Copy code
{
  "message": "Patient deleted successfully."
}
2. Providers API
GET /providers
Description: Retrieve a list of all providers.
Response: (Similar to Patients API)
GET /providers/
Description: Retrieve details of a specific provider by ID.
Path Parameters:
id: Provider ID.
Response: (Similar to Patients API)
POST /providers
Description: Add a new provider.
Request Body:
json
Copy code
{
  "first_name": "Sally",
  "last_name": "Sue",
  "provider_specialty": "Pediatrics",
  "email_address": "sallysue@healthcare.org",
  "phone_number": "5551211001",
  "date_joined": "1993-01-01"
}
Response: (Similar to Patients API)
PUT /providers/
Description: Update an existing provider's details.
Path Parameters:
id: Provider ID.
Request Body: (Similar to POST)
Response: (Similar to Patients API)
DELETE /providers/
Description: Delete a provider by ID.
Path Parameters:
id: Provider ID.
Response: (Similar to Patients API)
3. Visits API
GET /visits

Description: Retrieve a list of all visits.
Response:
json
Copy code
[
  {
    "visit_id": 1,
    "patient_id": 4,
    "provider_id": 1,
    "date_of_visit": "2019-01-01",
    "visit_type": "New",
    "blood_pressure_systolic": 175,
    "blood_pressure_diastolic": 139.0960314,
    "pulse": 56.67839826,
    "visit_status": "Completed"
  },
  ...
]
GET /visits/

Description: Retrieve details of a specific visit by ID.
Path Parameters:
id: Visit ID.
Response: (Similar to GET /visits)
POST /visits

Description: Add a new visit.
Request Body:
json
Copy code
{
  "patient_id": 4,
  "provider_id": 1,
  "date_of_visit": "2019-01-01",
  "visit_type": "New",
  "blood_pressure_systolic": 175,
  "blood_pressure_diastolic": 139.0960314,
  "pulse": 56.67839826,
  "visit_status": "Completed"
}
Response:
json
Copy code
{
  "visit_id": 10,
  "message": "Visit created successfully."
}
PUT /visits/

Description: Update an existing visit's details.
Path Parameters:
id: Visit ID.
Request Body: (Similar to POST)
Response: (Similar to POST /visits)
DELETE /visits/

Description: Delete a visit by ID.
Path Parameters:
id: Visit ID.
Response: (Similar to DELETE /patients/
)
4. ED Visits API
GET /ed-visits

Description: Retrieve a list of all emergency department visits.
Response:
json
Copy code
[
  {
    "ed_visit_id": 1,
    "visit_id": 1,
    "patient_id": 4,
    "acuity": 1,
    "reason_for_visit": "Stomach Ache",
    "ed_disposition": "Admitted"
  },
  ...
]
GET /ed-visits/

Description: Retrieve details of a specific ED visit by ID.
Path Parameters:
id: ED Visit ID.
Response: (Similar to GET /ed-visits)
POST /ed-visits

Description: Add a new ED visit.
Request Body:
json
Copy code
{
  "visit_id": 1,
  "patient_id": 4,
  "acuity": 1,
  "reason_for_visit": "Stomach Ache",
  "ed_disposition": "Admitted"
}
Response: (Similar to POST /visits)
PUT /ed-visits/

Description: Update an existing ED visit's details.
Path Parameters:
id: ED Visit ID.
Request Body: (Similar to POST)
Response: (Similar to POST /ed-visits)
DELETE /ed-visits/

Description: Delete an ED visit by ID.
Path Parameters:
id: ED Visit ID.
Response: (Similar to DELETE /visits/
)
5. Admissions API
GET /admissions

Description: Retrieve a list of all admissions.
Response:
json
Copy code
[
  {
    "admission_id": 1,
    "patient_id": 9,
    "admission_date": "2018-01-01",
    "service": "Cardiology",
    "primary_diagnosis": "AMI"
  },
  ...
]
GET /admissions/

Description: Retrieve details of a specific admission by ID.
Path Parameters:
id: Admission ID.
Response: (Similar to GET /admissions)
POST /admissions

Description: Add a new admission.
Request Body:
json
Copy code
{
  "patient_id": 9,
  "admission_date": "2018-01-01",
  "service": "Cardiology",
  "primary_diagnosis": "AMI"
}
Response: (Similar to POST /visits)
PUT /admissions/

Description: Update an existing admission's details.
Path Parameters:
id: Admission ID.
Request Body: (Similar to POST)
Response: (Similar to POST /admissions)
DELETE /admissions/

Description: Delete an admission by ID.
Path Parameters:
id: Admission ID.
Response: (Similar to DELETE /visits/
)
6. Discharges API
GET /discharges
Description: Retrieve a list of all discharges.
Response:
json
Copy code
[
  {
    "discharges_id": 1,
    "admission_id": 1,
    "patient_id": 9,
    "discharge_date": "2018
-01-07", "discharge_disposition": "Expired" }, ... ] ```

GET /discharges/

Description: Retrieve details of a specific discharge by ID.
Path Parameters:
id: Discharge ID.
Response: (Similar to GET /discharges)
POST /discharges

Description: Add a new discharge.
Request Body:
json
Copy code
{
  "admission_id": 1,
  "patient_id": 9,
  "discharge_date": "2018-01-07",
  "discharge_disposition": "Expired"
}
Response: (Similar to POST /visits)
PUT /discharges/

Description: Update an existing discharge's details.
Path Parameters:
id: Discharge ID.
Request Body: (Similar to POST)
Response: (Similar to POST /discharges)
DELETE /discharges/

Description: Delete a discharge by ID.
Path Parameters:
id: Discharge ID.
Response: (Similar to DELETE /visits/
)
