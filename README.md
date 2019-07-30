# My Home PT Application Server
This is the main that is a go-between our client-focused app and our database.

## Models
All models have the following fields which are automatically generated:
```
{
    _id: string,
    __v: number,
    created_on: Date,
    updated_on: Date
}
```
### User
```
{
    signed_in_on: Date,     // automatically generated
    signed_out_on: Date,    // automatically generated
    name: {
        given: string,
        family: string,
        display: string = `${given} ${family}`,
        prefix?: string,
        middle?: string,
        suffix?: string
    },
    email: string,
    hashed_password: string,    // automatically hashed
    therapist_ids: string[] = [],
    patient_ids: string[] = [],
    task_ids: string[] = [],
    privilege: number = 0,
    sex?: {
        geneExpression: string,
        gender: string
    },
    phone_number?: string,
    birthday?: Date
}
```
### Task
```
{
    issuer_id: string,      // typically a therapist
    target_id: string,      // typically a patient
    exercise_ids: string[] = [],
    completed_on?: Date,
    details?: string,
    result?: string,
    score?: sting
}
```
### Exercise
```
{
    creator_id: string,
    title: string = 'Unnamed Exercise',
    description?: string,
    video_url?: string,
    flexdot_instructions?: any
}
```

## Routes
**Root**: `https://myhomept-server.herokuapp.com/api/`

_All headers require:_
```$xslt
{ 'Content-type': 'application/json' }
```
## Unprotected
### / `auth` / 
_Sign In, Sign Up, Sign Out_

**Sign In**
``` sh
POST
body: { email: string, password: string }
returns: { user: User, JWT: string, expiresOn: Date }
```
##
**Sign Up**
 
_requires email to be unique_
```$xslt
PUT
body: User
returns: { user: User, JWT: string, expiresOn: Date }
```
##

## Protected
_All headers additionally require the JWT token as so:_
```$xslt
{ 'Authorization': 'Bearer $token' }
```
### / `signout` /
**Sign Out** 

_revokes JWT token. updates last sign out time._
```$xslt
POST
```
##
_Tables are:_
* **users**
* **tasks**
* **exercises**

_All tables support standard CRUD:_
* PUT: **C**reate
* GET: **R**ead
* PATCH: **U**pdate
* DELETE: **D**elete

* POST: replace

Get **All** in one table using `GET: /api/'TABLE_NAME'/all`

Pass the id of the entity to Http Params to target a single entity, or none to target many
```$xslt
api/'TABLE_NAME'/                 --> many entities
api/'TABLE_NAME'/:id              --> one entity
api/'TABLE_NAME'/date?start=&end= --> many by date range.
```

### / `users` /
_additionally supports the following GET:_
```$xslt
/               --> Current user
/therapists     --> Therapists of user
/patients       --> Patients of user
/tasks          --> Tasks of user
```
_and the following POST:_
```$xslt
/:patientId         --> Assign Patient by id
/:therapistId       --> Assign Therapist by id
/:patientEmail      --> Assign Patient by email
/:therapistEmail    --> Assign Therapist by email
```

For example, 
`POST api/users/:id/:patientId`
will assign patient of `patientId` to user of `id`.
