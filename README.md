# save2wo-api
---

## Usage

**Always** remember that the format for the date is: `YYYY-MM-DD`

---

### Records of Fish Kills
To access the list of the fish kills redirect to `/history`:

Items:

URL | Description | Example use
----|---------------| -----------
`/history/cage/{cage_number}` | Displays records that corresponds to the cage number | `/history/cage/3`
`/history/fish-kill/from/{fromDate}/to/{toDate}` | Displays records filtered by range of dates |  `/history/fish-kill/from/2024-01-01/to/2024-02-02/`
`/history/fish-kill/after/{date}`| Displays records of fish kill after the date given | `/history/fish-kill/after/2023-06-01`
`/history/fish-kill/before/{date}`| Displays records of fish kill before the date given | `/history/fish-kill/before/2022-03-23`
`/history/fish-kill/latest`| Display the latest records of fish kill | `/history/fish-kill/latest`


This is the sample return from: `/history/cage/{cage_number}`

```json
{
      {
        "contamination": "pH Level Unstable",
        "water_quality": {
            "Temperature": 21,
            "NO2": 0.1,
            "pH": 5.1,
            "DO": 5
        },
        "dead_fish": 49,
        "timestamp": {
            "seconds": 1692775612,
            "nanoseconds": 0
        },
        "cage": 1
    },
    {
        "contamination": "Dissolved Oxygen Low",
        "cage": 1,
        "dead_fish": 78,
        "water_quality": {
            "DO": 2,
            "NO2": 0.2,
            "Temperature": 20,
            "pH": 6.8
        },
        "timestamp": {
            "seconds": 1708650755,
            "nanoseconds": 0
        }
    }
}
```


---



### Records of Contamination
To access the list of contamination redirect to `/contamination`:





Items:

URL | Description | Example use
----|---------------| -----------
`/contamination/cage/{cage_number}` | Displays records that corresponds to the cage number | `/contamination/cage/6`
`/contamination/{level}`| Display records based on contamination level | `/contamination/pH Level Unstable`
`/contamination/from/{fromDate}/to/{toDate}` | Displays records filtered by range of dates |  `/contamination/from/2024-01-01/to/2024-02-02/`
`/contamination/after/{date}`| Displays records of contamination after the date given | `/contamination/after/2023-06-01`
`/contamination/before/{date}`| Displays records of contamination before the date given | `/contamination/before/2022-03-23`
`/contamination/latest/{limit}`| Display the latest number of records for contamination | `/contamination/latest/5`



Sample records from `/contamination/latest/{limit}`

```json
[
    {
        "water_quality": {
            "pH": 6.3,
            "Temperature": 26,
            "DO": 2,
            "NO2": 0.9
        },
        "timestamp": {
            "seconds": 1720486760,
            "nanoseconds": 0
        },
        "contamination": "Dissolved Oxygen Low",
        "cage": 2
    },
    {
        "cage": 3,
        "timestamp": {
            "seconds": 1720731771,
            "nanoseconds": 0
        },
        "water_quality": {
            "Temperature": 21,
            "pH": 4.9,
            "NO2": 0.6,
            "DO": 5
        },
        "contamination": "pH Level Unstable"
    }
]
```

---

### Records of Threshold
To access the list of threshold records redirect to `/threshold`:





Items:

URL | Description | Example use
----|---------------| -----------
`/threshold/cage/{cage_number}` | Displays records that corresponds to the cage number | `/threshold/cage/6`
`/threshold/contamination/{level}`| Display records based on contamination level | `/threshold/contamination/pH Level Unstable`
`/threshold/from/{fromDate}/to/{toDate}` | Displays records filtered by range of dates |  `/threshold/from/2024-01-01/to/2024-02-02/`
`/threshold/after/{date}`| Displays records of threshold after the date given | `/threshold/after/2023-06-01`
`/threshold/before/{date}`| Displays records of threshold before the date given | `/threshold/before/2022-03-23`
`/threshold/latest`| Displays one latest record of threshold | `/threshold/latest`
`/threshold/latest/{limit}`| Displays the latest number of records for threshold  | `/threshold/latest/5`



Sample records from `/threshold/contamination/{level}`

```json
[
{
        "status": "Low Dissolved Oxygen at 7:56AM",
        "timestamp": {
            "seconds": 1720223762,
            "nanoseconds": 0
        },
        "cage": 3,
        "contamination": "Low Dissolved Oxygen"
    },
    {
        "timestamp": {
            "seconds": 1700831897,
            "nanoseconds": 0
        },
        "cage": 2,
        "contamination": "Low Dissolved Oxygen",
        "status": "Low Dissolved Oxygen at 9:18PM"
    }
]
```
