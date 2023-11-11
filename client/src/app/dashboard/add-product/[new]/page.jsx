'use client'
import React from 'react'
import { Stepper, Step, Button, Typography } from '@material-tailwind/react'
import { CogIcon, UserIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

export default function AddProduct() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [isLastStep, setIsLastStep] = React.useState(false)
  const [isFirstStep, setIsFirstStep] = React.useState(false)

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

  return (
    <div className="w-full px-10 py-4 lg:px-24">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 0 ? 'blue-gray' : 'gray'}>
              Deatils
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 1 ? 'blue-gray' : 'gray'}>
              Pictures
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 2 ? 'blue-gray' : 'gray'}>
              Preview
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} variant="outlined" disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} variant="outlined" disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  )
}
