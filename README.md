# visa-beeper (USA visas only by now)

## A Script for helping you being notified when there is a free spot available

After the pandemics some consulates are out of schedules, since there is lots of persons trying to renew their visas.
I was hear about some "slots getting opened" but when I go try advancing my schedule I found nothing there.
So, I decided to try to monitor these free spots.
With that in mind, the easily way was to paste some script on browser console for "beeping" when a date that satisfies my conditions are available.

## Usage

1. Adjust the script (filling the variable accordingly) for your needs:
  - Fill your account number, that can be found on your url when logged into the scheduling system.
  - Fill the code of the CITY you want to monitor. (I have just mapped brazilian one's)
  - Fill the months you want to monitor in the format provided as sample ("2021-12", "2022-01")
  - If your city has more than one option of office, you can fill the expectedOrg variable with the office code. (I have just mapped brazilian one's)

2. Login to the scheduler system (https://ais.usvisa-info.com/pt-br/niv in portuguese)
3. Go to reschedule and leave the page ready (to be faster) to reschedule you appointment. I suggest choosing a different city, so you can change right away after listening to the beep.
4. Duplicate the browser tab, open a developer console, and paste the script. It will begin pooling the free spots based on the conditions specified.

## More info

### How do I stop the script?

To stop the script, enter the command stop() on the console and hit enter:

```
stop()
```

### How do I test if the beep is working?

Just call the beep function anytime after pasting the code:

```
beep(1000, 0.5)
```

## Mapping other cities / offices

Just got to your developer console at your browser, and check the "Network" tab, when manipulating the options (selecting the city/office) you will see the codes on the request's urls.

## No Warranty

As stated by the license and enforced here, the author disclaims ANY liability on using this tool, including if this tool is going to work or not, if you are going to lock your credentials or not, nothing is guaranteed. And we don't provide support either. It is a free tool, with no warranties.
