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
    [] edition/Package
    [] auction(boolean)
    [] manufactureDate `years`
    [] registrationDate `years`
    [] fuelType `Enum`
    [] transmission `Enum`
    [] bodytype `Enum`
    [] steering `Enum`
    [] color
    [] price
    [] noOfPass
    [] milleage
    [] loadCapacity
    [] engCc
    [] noOfseat
    [] noOfowner

    [] features:
        [
        "drivetrain"
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
    [] exteriorColor
    [] startDate? why adde?
    [] endtDate? why?
    [] description
    [] division
    [] district
    [] thana
    [] createAt
    [] updateAt
    [] userId

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

    [] name
    [] productId
    [] status["approved", "rejected"]
    [] createAt
    [] updateAt
    [] userId

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
