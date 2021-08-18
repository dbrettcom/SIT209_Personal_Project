define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "/Users/danielbrett/Code/SIT209/topic6/api/public/generated-docs/main.js",
    "groupTitle": "/Users/danielbrett/Code/SIT209/topic6/api/public/generated-docs/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/devices",
    "title": "Read a device",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Successful Response:",
          "content": "[\n  {\n    \"_id\": \"dsohsdohsdofhsofhosfhsofh\",\n    \"name\": \"Mary's iPhone\",\n    \"user\": \"mary\",\n    \"sensorData\": [\n      {\n        \"ts\": \"1529542230\",\n        \"temp\": 12,\n        \"loc\": {\n          \"lat\": -37.84674,\n          \"lon\": 145.115113\n        }\n      },\n      {\n        \"ts\": \"1529572230\",\n        \"temp\": 17,\n        \"loc\": {\n          \"lat\": -37.850026,\n          \"lon\": 145.117683\n        }\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response:",
          "content": "{\n  \"User does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevices"
  },
  {
    "type": "post",
    "url": "/api/devices",
    "title": "Add a new device",
    "group": "Device",
    "examples": [
      {
        "title": "Successful Response:",
        "content": "{\n \"Successfully added device and data\"\n }",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's name and their device (eg: &quot;Mary's iPhone&quot;).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>The user's name (eg: &quot;Mary&quot;).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ts",
            "description": "<p>The device's ts number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "temp",
            "description": "<p>The device's temperature.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>The device's latitudinal location.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lon",
            "description": "<p>The device's longitudinal location.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Post:",
          "content": "[\n  {\n    \"name\": \"Mary's iPhone\",\n    \"user\": \"mary\",\n    \"sensorData\": [\n      {\n        \"ts\": \"1529542230\",\n        \"temp\": 12,\n        \"loc\": {\n          \"lat\": -37.84674,\n          \"lon\": 145.115113\n        }\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "PostApiDevices"
  }
] });
