# Client-Server Realtime Communication Pusher API

Features List:  
Pusher Client-Server Communication for Editing Project Template Versions:
1.	Client Side
        1.	Init Pusher Client
        2.	Send are alive messages every 5 mins
        3.	Store session token in session storage
2.	Server Side
        1.	Init Pusher Server
        2.	Establish connection via Pusher Channel
3.	Database
        1.	CRUD to tblconnections
        2.	Discuss session token
5. **(S -> C) Events that are passed (in JSON)**
    - Prologue - Is listening for client connections.
    1.  GetStatusOfProjectVersionTemplate
        1. id (PK of tblconnections)
        2. receipt_number: int (randomly generated, conversation number)
        3. **OKToEdit**: Boolean
        4. project_version_id, 
        5. project_version_name, 
        6. project_template_id (need join to the template tbl), 
        7. project_template_name (need join to the template tbl),
        8. current_staff_editing_id,
        9. current_staff_editing_name,
        10. last_updated_time,
    2. 
5. **(C -> S) Events that are passed (in JSON)**
    1. decisionEvent 
        1. **reciept_number:** int (same as initial server receipt no.)
        2. **client_timestamp** *timestamp* (last update timestamp) 
        3. **SeqNumber** 
        3. **action:** *payload* (collection of keys, values)
            1. startConnection
            2. connectionIsAlive
                1. **sessionToken:** *uuidv4 string* (if stored in SessionStorage) - unique uuidv4
                    per browser tab. 
            3. requestUseOfProjectVersionTemplate
                1. **connectionId:** *int NON-NULL* (Primary Key of tblconnections) 
                2. **sessionToken:** *uuidv4 string NON-NULL* (stored in SessionStorage or newly generated) - unique uuidv4
                    per browser tab.
                2. **project_version_id:** *int NON-NULL* (last updated timestamp) 
            3. WouldLikeToKickOutUser
                1. **connectionId:** *int NON-NULL* (Primary Key of tblconnections) 
                2. **sessionToken:** *uuidv4 string NON-NULL* (stored in SessionStorage or newly generated) - unique uuidv4
                    per browser tab.
                2. **project_version_id:** *int NON-NULL* (last updated timestamp) 
            4. responseToRequestToBeKickedOut
                1. **kickMeOut:** *boolean* (client's response to the question, another user asks to kick you out)
            5. endConnection
            
            
TblConnections Schema
1. **id:** int, PK
2. **sessionToken:** uuid string (generated .)
3. **staff_id:** int FK (same as initial server receipt no.)
4. **version_id:** int FK (same as initial server receipt no.)
5. **last_updated:** int (same as initial server receipt no.)
6. **created:** int (same as initial server receipt no.)

TblConnectionKickoff Schema (should be **append-only**, it is a essentially a log)
1. **id:** int, PK
2. **staff_id_kicker:** int, FK
3. **staff_id_receiver:** int, FK
4. **tblconnection_id:** int, FK (foreign key to tblconnections)
5. **old_SessionToken:** uuid, (foreign key to tblconnections)
6. **new_SessionToken:** uuid, (foreign key to tblconnections)
7. **created:** int, PK (time of kick off)

Scenarios with **SessionToken** 

1. On requestUseOfProjectVersionTemplate (C -> S)
    1. No entry for version_id in tblconnections
        - **automatically create entry **
    2. Entry for version_id in tblconnections
        1. SessionToken matches - can continue
        