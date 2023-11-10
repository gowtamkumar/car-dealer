## User

    [] firstName
    [] lastName
    [] username
    [] password
    [] email
    [] dob
    [] address
    [] phone
    [] photo
    [] status
    [] roles ["admin","oparator","seller"]
    [] isAdmin
    [] createAt
    [] updateAt

## products

    [] condition["new", "recondition", "used"]
    [] name
    [] brandId
    [] modelId
    [] modelCodeId
    [] edition `string`
    [] auction(boolean)
    [] manufactureDate `years`
    [] registrationDate `years`
    [] fuelType [diesel,Petrol, CNG, Hybrid, Electric, Octane,LPG,Other]
    [] transmission [automatic,manual,semiautomatic,CVT,DCT,Sport AT, Other]
    [] bodytype [MPV, Hypercar, Supercar, Electric, Convertible,Coupe,Pickup, Compact, Mini MPV, Vagon, Off Roader, Van, MIniVan, Hatchback, Crossover, SUV, Sedan]

    [] steering [Left, Right]
    [] color[gray, Lime Green, Pink, Purple, Beige, Gold,Brown, Yellow, Orange, Dark Green, Green, Sky Blue, Mica Blue,Dark Blue, Blue, Red, Navy Blue,Grey, Silver, Red Wine, Pearl, Black, White]
    [] price
    [] noOfPass
    [] milleage
    [] loadCapacity
    [] engCc
    [] engCode
    [] noOfseat
    [] noOfowner
    [] drivetrain [2 Wheel Drive, 4 Wheel Drive]
    [] description
    [] division ?
    [] district ?
    [] thana ?
    [] createAt
    [] updateAt
    [] userId

## productFeatures:
        [
        "cdPlayer"
        "sunRoof"
        "alloyWheels"
        "powerSteering"
        "powerWindow"
        "ac"
        "abs"
        'air Bag'
        "radio"
        "cdChanger"
        "dvd"
        "tv"
        "powerSeat"
        "powerSeat"
        "backTire"
        "grillGuard"
        "rearSpoiler"
        "centerLocking"
        "jack"
        "spareTire"
        "wheelSpanner"
        "fogLight"
        "backCamera"
        "pushStart"
        "keyLessentry"
        "esc"
        "360DCamera"
        "bodyKit"
        "sideAirbag"
        "powerMirror"
        "sideSkirts"
        "fontLipSpoiler"
        "navigation"
        "turbo"
        "nonSmoker"
        ]
  

## brands

    [] name
    [] logo
    [] status

## model

    [] name
    [] brandId
    [] status

## modelCode

    [] name
    [] modelId

## review

    [] description
    [] productId
    [] rating
    [] status["approved","Pending", "rejected"]
    [] userId
    [] createAt
    [] updateAt

## setting

    [] companyName
    [] address
    [] logo
    [] phone
    [] email

## ui

    []
    []
    []
    []
