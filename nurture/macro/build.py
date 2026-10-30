# Brit's Brothers macro nurture: 5 emails sent by the GHL workflow "UpState | Macro Calculator Nurture".
# Run: python3 nurture/macro/build.py
# Writes dist/emailN.body.html (paste into the GHL workflow email action, source code view),
# dist/emailN.html (full standalone template) and preview/emailN.html (sample values filled).
# Subjects and preheaders go to manifest.json. Coach list for email 4 lives in coaches.json.
# Read nurture/macro/README.md before changing anything here.
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)
COACHES = json.load(open('coaches.json'))['coaches']
SITE = 'https://www.britsbrothersgym.com'
def utm(path, n): return f"{SITE}{path}?utm_source=upstate&utm_medium=email&utm_campaign=macro-nurture&utm_content=email{n}"
F = lambda k: '{{contact.%s}}' % k
FIRST = '{{contact.first_name}}'
HEAD = lambda pre: f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>Brit's Brothers Gym</title></head>
<body style="margin:0;padding:0;background-color:#e9e9ec;"><div style="display:none;max-height:0;overflow:hidden;opacity:0;">{pre}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e9e9ec;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#121214;">
<tr><td style="padding:22px 28px;border-bottom:3px solid #cc1e23;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;"><img src="{SITE}/apple-touch-icon.png" width="44" height="44" alt="Brit's Brothers Gym" style="display:block;border:0;border-radius:22px;"></td>
<td><div style="font-family:Impact,'Arial Black',Arial,sans-serif;font-size:22px;letter-spacing:1px;color:#fdfdff;line-height:1;">BRIT'S BROTHERS</div>
<div style="font-family:Georgia,serif;font-style:italic;font-size:12px;color:#a7a7ad;padding-top:4px;">Est. 1994 &middot; Greenville, SC</div></td></tr></table></td></tr>'''
P = lambda t, top=18: f'<tr><td style="padding:{top}px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:#d6d6db;">{t}</td></tr>'
H2 = lambda t: f'<tr><td style="padding:26px 28px 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:3px;color:#cc1e23;text-transform:uppercase;">{t}</td></tr>'
def LIST(items):
    rows=''.join(f'<tr><td valign="top" style="padding:6px 10px 6px 0;color:#cc1e23;font-size:16px;line-height:22px;">&#9632;</td><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#d6d6db;">{i}</td></tr>' for i in items)
    return f'<tr><td style="padding:12px 28px 0 28px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">{rows}</table></td></tr>'
def BTN(label, url): return f'''<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#cc1e23" style="background-color:#cc1e23;"><a href="{url}" style="display:inline-block;padding:15px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;color:#fdfdff;text-decoration:none;text-transform:uppercase;">{label}</a></td></tr></table>'''
REPLY = "This is not a no-reply address. Hit reply and a real person on our team reads it."
def CTA(title, text, label, url, extra=''):
    return f'''<tr><td style="padding:28px 20px 8px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1c1c1e;border:1px solid #2a2a2c;"><tr><td align="center" style="padding:26px 22px;font-family:Arial,Helvetica,sans-serif;">
<div style="font-family:Impact,'Arial Black',Arial,sans-serif;font-size:26px;line-height:30px;color:#fdfdff;letter-spacing:1px;">{title}</div>
<div style="font-size:15px;line-height:22px;color:#a7a7ad;padding:12px 0 20px 0;">{text}</div>{BTN(label,url)}
<div style="font-size:13px;line-height:20px;color:#a7a7ad;padding-top:16px;">{REPLY}{extra}</div></td></tr></table></td></tr>'''
SIGN = P('The Brit\'s Brothers team', 22)
FOOT = '''<tr><td style="padding:26px 28px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:#6b6b72;">
Your numbers are estimates from published formulas, not medical or nutrition advice. If you are pregnant, managing a health condition, or have a history of disordered eating, talk to your doctor before changing how you eat.<br><br>
Brit's Brothers Gym &middot; 301 Airport Rd, Suite K, Greenville, SC 29601 &middot; (864) 553-3821<br>
You are getting this because you used the macro calculator at britsbrothersgym.com and asked for tips.</td></tr>
</table></td></tr></table></body></html>'''

def stat(label, key, color):
    return f'''<td width="33%" valign="top" style="padding:0 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1c1c1e;border-top:4px solid {color};"><tr><td align="center" style="padding:16px 8px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;color:#a7a7ad;text-transform:uppercase;">{label}</div>
<div style="font-family:Impact,'Arial Black',Arial,sans-serif;font-size:34px;line-height:42px;color:#fdfdff;">{F('macro_'+key)}<span style="font-size:18px;color:#a7a7ad;">g</span></div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#a7a7ad;">{F('macro_'+key+'_pct')}</div></td></tr></table></td>'''
def row(k, v, last=False):
    b = '' if last else 'border-bottom:1px solid #2a2a2c;'
    return f'<tr><td style="padding:10px 0;{b}color:#a7a7ad;">{k}</td><td align="right" style="padding:10px 0;{b}color:#fdfdff;font-weight:bold;">{v}</td></tr>'

EVAL1 = utm('/consultation',1)
email1 = HEAD('Your daily calories plus protein, carbs and fat, built around how you train.') + \
  P(f'{FIRST}, here are your numbers from the macro calculator. Save this email. It is your starting point.', 28) + \
  f'''<tr><td align="center" style="padding:28px 28px 8px 28px;"><div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:3px;color:#cc1e23;text-transform:uppercase;">Daily target</div>
<div style="font-family:Impact,'Arial Black',Arial,sans-serif;font-size:72px;line-height:80px;color:#fdfdff;">{F('macro_calories')}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;color:#a7a7ad;text-transform:uppercase;">Calories a day</div></td></tr>
<tr><td style="padding:24px 20px 8px 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>{stat('Protein','protein','#cc1e23')}{stat('Carbs','carbs','#fdfdff')}{stat('Fat','fat','#5a5a61')}</tr></table></td></tr>
<tr><td style="padding:20px 26px 4px 26px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;">
{row('Your goal', F('macro_goal'))}{row('Your training', F('macro_training'))}{row('Protein per meal, 4 meals', F('macro_protein_per_meal')+'g', True)}</table></td></tr>''' + \
  H2('How to use these') + \
  P('Hit your protein first. It is the number that protects your strength. Let carbs and fat flex around it.<br><br>Run these for three weeks before you judge them. Weigh in on the same morning each week and watch your lifts. If both are flat, the numbers need adjusting, not abandoning.', 10) + \
  CTA('WANT A COACH TO CHECK THESE?', 'Book a free 30 minute evaluation at the gym. A coach looks at your numbers and your training with you. No cost, no contract.', 'Book my free evaluation', EVAL1,
      f'<br><br>Not sure who to train with? <a href="{utm("/find-your-trainer",1)}" style="color:#fdfdff;">Take the 90 second trainer quiz.</a>') + \
  FOOT

email2 = HEAD('Protein protects your strength. Here is how to hit it without overthinking it.') + \
  P(f'{FIRST}, quick follow-up on your macros.', 28) + \
  P(f'If you only track one number, make it protein. It protects your strength while everything else moves. Your target is <b style="color:#fdfdff;">{F("macro_protein")}g a day</b>. Across four meals that is about <b style="color:#fdfdff;">{F("macro_protein_per_meal")}g each</b>.') + \
  H2('What a solid serving looks like') + \
  LIST(['4 oz cooked chicken breast: about 35g','1 cup plain Greek yogurt: about 23g','4 large eggs: about 24g','A 5 oz can of tuna: about 25g','1 scoop of whey: usually 20 to 25g, check the label']) + \
  H2('Two habits that make it easy') + \
  LIST(['<b style="color:#fdfdff;">Get 30g or more at breakfast.</b> Most people come up short because the first meal is all carbs.','<b style="color:#fdfdff;">Keep a backup on hand.</b> A shake, jerky or a protein bar covers the days that go sideways.']) + \
  CTA('QUESTIONS ON YOUR NUMBERS?', 'Send them over. Or book a free evaluation and a coach will build them into a plan with you.', 'Book my free evaluation', utm('/consultation',2)) + \
  SIGN + FOOT

email3 = HEAD('How to tell if your numbers are working, and when to change them.') + \
  P(f'{FIRST}, here is how to tell if your numbers are working.', 28) + \
  P(f'Your plan right now: <b style="color:#fdfdff;">{F("macro_goal")}</b> on <b style="color:#fdfdff;">{F("macro_calories")} calories</b> a day.') + \
  H2('Three things to watch') + \
  LIST(['<b style="color:#fdfdff;">Weigh in once a week.</b> Same morning, same conditions, before you eat. Daily numbers bounce with water and salt, so ignore any single day.',
        '<b style="color:#fdfdff;">Watch your lifts.</b> If your lifts hold while the scale moves the way you want, the numbers are right. If they drop off fast, you are eating too little.',
        '<b style="color:#fdfdff;">Give it three weeks.</b> Then change by 100 to 200 calories, not 500. Small move, then wait again.']) + \
  CTA('STUCK AFTER THREE WEEKS?', 'Reply with your weekly weigh-ins and we will take a look. Or book a free evaluation and go over it in person.', 'Book my free evaluation', utm('/consultation',3)) + \
  SIGN + FOOT

email4 = HEAD('Numbers get you started. The right coach gets you further.') + \
  P(f'{FIRST}, numbers get you started. A coach gets you further.', 28) + \
  P('Brit\'s Brothers has coaches for very different goals:') + \
  LIST([f'<b style="color:#fdfdff;">{c["name"]}:</b> {c["line"]}' for c in COACHES]) + \
  CTA('NOT SURE WHO FITS?', 'The 90 second trainer quiz matches you with the coach built for your goal.', 'Find my coach', utm('/find-your-trainer',4),
      f'<br><br>Already know? <a href="{utm("/consultation",4)}" style="color:#fdfdff;">Book a free evaluation.</a>') + \
  SIGN + FOOT

email5 = HEAD('A free 30 minute evaluation at the gym. No cost, no contract.') + \
  P(f'{FIRST}, last note in this series.', 28) + \
  P('If you want someone to check your numbers, your training and your form in person, book a free evaluation. Brit\'s Brothers was voted Best Trainer of the Upstate nine years running, and this is the easiest way to see why.') + \
  H2('What happens in 30 minutes') + \
  LIST(['A walk through the gym','A look at where you are now and where you want to be','A match with the coach who fits your goal','No cost and no contract']) + \
  CTA('READY WHEN YOU ARE', 'Pick a time that works for you.', 'Book my free evaluation', utm('/consultation',5)) + \
  SIGN + FOOT

emails = [
  dict(n=1, day=0, name='UpState Macro 1: Results card', subject=f'Your macros, {FIRST}', html=email1),
  dict(n=2, day=2, name='UpState Macro 2: Protein first', subject='The one number to hit first', html=email2),
  dict(n=3, day=5, name='UpState Macro 3: First three weeks', subject='How to tell if your numbers are working', html=email3),
  dict(n=4, day=9, name='UpState Macro 4: Find your coach', subject='Which coach fits you?', html=email4),
  dict(n=5, day=14, name='UpState Macro 5: Free evaluation', subject='30 minutes at the gym, on us', html=email5),
]
sample = {'first_name':'Jerry','macro_calories':'2620','macro_protein':'185','macro_carbs':'303','macro_fat':'74','macro_protein_pct':'28% of calories','macro_carbs_pct':'46% of calories','macro_fat_pct':'25% of calories','macro_protein_per_meal':'46','macro_goal':'Hold weight, get stronger','macro_training':'4x a week, main lift + accessories'}
os.makedirs('dist',exist_ok=True); os.makedirs('preview',exist_ok=True)
for e in emails:
    open(f"dist/email{e['n']}.html",'w').write(e['html'])
    body = re.search(r'<body[^>]*>(.*)</body>', e['html'], re.S).group(1)
    body = re.sub(r'<div style="display:none;max-height:0;overflow:hidden;opacity:0;">.*?</div>\n?', '', body, count=1, flags=re.S)
    body = re.sub(r'>\s*\n\s*<', '><', '<div style="margin:0;padding:0;background-color:#e9e9ec;">' + body.strip() + '</div>').replace('\n', ' ')
    open(f"dist/email{e['n']}.body.html",'w').write(body)
    pv = e['html']
    for k,v in sample.items(): pv = pv.replace('{{contact.%s}}'%k, v)
    open(f"preview/email{e['n']}.html",'w').write(pv)
    left = re.findall(r'\{\{[^}]+\}\}', pv)
    dash = [c for c in '—–' if c in e['html']+e['subject']]
    print(f"email{e['n']} day {e['day']:>2} | {e['subject']:<40} | {len(e['html'])//1024}KB | unfilled:{left} dashes:{dash}")
for e in emails: e['preheader'] = re.search(r'opacity:0;">(.*?)</div>', e['html']).group(1)
json.dump([{k:v for k,v in e.items() if k!='html'} for e in emails], open('manifest.json','w'), indent=2)
open('manifest.json','a').write('\n')
