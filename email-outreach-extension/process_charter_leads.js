const fs = require('fs');
const path = require('path');

const rawData = `Aerokalinga Aviation: [capt.sandeepmishra@gmail.com](mailto:capt.sandeepmishra@gmail.com)
Afcom Holdings: [deepak@afcomcargo.com](mailto:deepak@afcomcargo.com)
Air Charters Services: [sunil@aircharterservices.com](mailto:sunil@aircharterservices.com)
Airports Authority of India (Flight Inspection Unit): [fiuops@aai.aero](mailto:fiuops@aai.aero)
Aman Aviation & Aerospace Solutions: [am@amanaviation.in](mailto:am@amanaviation.in)
Aone Helicopters: [ceo@aonehelicopters.com](mailto:ceo@aonehelicopters.com)
AR Airways: [radhey.gautam@cluboneair.com](mailto:radhey.gautam@cluboneair.com)
Aryan Aviation: [gm@aryanaviation.com](mailto:gm@aryanaviation.com)
Arrow Aircrafts Sales & Charters: [shailendra@arrowaircraft.com](mailto:shailendra@arrowaircraft.com)
Aurea Aviation: [rajesh@aureaaviation.com](mailto:rajesh@aureaaviation.com)
Avenor Aviation LLP: [accountablemanager@avenoraviation.com](mailto:accountablemanager@avenoraviation.com)
Aviation Connectivity & Infrastructure Developers: [ceo@flyairtaxi.in](mailto:ceo@flyairtaxi.in)
Avocet Aviation: [yashpal@avocet.co.in](mailto:yashpal@avocet.co.in)
Bajaj Aviation: [srisanth@bajajaviation.com](mailto:srisanth@bajajaviation.com)
Baramati Agro: [aviation@baramatiagro.com](mailto:aviation@baramatiagro.com)
Bativala M Bhagvati Flying Charters LLP: [am@flyingcharters.com](mailto:am@flyingcharters.com)
B.G. Shirke Construction Technology: [phalkedhananjay@gmail.com](mailto:phalkedhananjay@gmail.com)
Bluecraft Aviation: [info@bluecraftaviation.com](mailto:info@bluecraftaviation.com)
Carewell Aviation India: [pawan@carewellaviation.com](mailto:pawan@carewellaviation.com)
Charlie Foxtrot Aviation Service: [am@charliefoxtrot.in](mailto:am@charliefoxtrot.in)
Chipsan Aviation: [am@chipsan.com](mailto:am@chipsan.com)
Dadachanji Aviation: [am@dadachanjiaviation.com](mailto:am@dadachanjiaviation.com)
Davangere Sugar Company: [ratnarajcp.dscl@gmail.com](mailto:ratnarajcp.dscl@gmail.com)
Deccan Charters: [am@deccanair.com](mailto:am@deccanair.com)
Dhillon Aviation: [dhillon.aviation1@gmail.com](mailto:dhillon.aviation1@gmail.com)
Dunes Aviation: [am@dunesair.in](mailto:am@dunesair.in)
E-Factor Adventure Tourism: [samit@efactor4u.com](mailto:samit@efactor4u.com)
EHA Aviation: [operations@ehaaviation.com](mailto:operations@ehaaviation.com)
EIH Ltd.: [director.aviation@oberoigroup.com](mailto:director.aviation@oberoigroup.com)
Empire Aircraft Management Services: [qualityind@empire.aero](mailto:qualityind@empire.aero)
EMSOS Aviation: [am@emsosav.com](mailto:am@emsosav.com)
Everdeliver Logistics: [Operations@everdeliver.in](mailto:Operations@everdeliver.in)
Falcon Aviation Services: [am@faspl.co.in](mailto:am@faspl.co.in)
Fairwinds Aviation: [fairwinds.ldh@gmail.com](mailto:fairwinds.ldh@gmail.com)
Fern Aviation India: [info@fernaviation.com](mailto:info@fernaviation.com)
Flaps Aviation: [gyan@flapsaviation.in](mailto:gyan@flapsaviation.in)
FLYSBS Aviation: [kannan@sbsaviation.in](mailto:kannan@sbsaviation.in)
Forum I Aviation: [harry@forum1aviation.net](mailto:harry@forum1aviation.net)
Freedom Charter Services: [am@flyfreedom.in](mailto:am@flyfreedom.in)
Global Vectra Helicorp: [maneesh@gvhl.net](mailto:maneesh@gvhl.net)
Ghodawat Enterprises: [suresh.karelam@starair.in](mailto:suresh.karelam@starair.in)
GMR Aviation: [ashok.gopinath@gmrgroup.in](mailto:ashok.gopinath@gmrgroup.in)
Golden Baritone (Jatayu): [accountablemanager@jetayou.com](mailto:accountablemanager@jetayou.com)
Golden Crane Aviation: [am@goldencrane.in](mailto:am@goldencrane.in)
GSEC Aviation: [naveen.kumar@gsecaviation.com](mailto:naveen.kumar@gsecaviation.com)
Heligo Charters: [am@heligo.in](mailto:am@heligo.in)
Heritage Aviation: [rohit.mathur@heritageaviation.in](mailto:rohit.mathur@heritageaviation.in)
Himalayan Heli Services: [operations@himalayanheli.com](mailto:operations@himalayanheli.com)
Himalyaputra Aviation: [julian.dsouza@adani.com](mailto:julian.dsouza@adani.com)
Himanad Management Services: [contact@himanad.com](mailto:contact@himanad.com)
HN Safal Aviation: [ops@hnsafal.com](mailto:ops@hnsafal.com)
Hyderabad Airlines: [info@hyderabadairlines.com](mailto:info@hyderabadairlines.com)
IIC Technologies: [vijay.madhavarapu@iictechnologies.com](mailto:vijay.madhavarapu@iictechnologies.com)
Indo Pacific Aviation: [accountable.manager@indopacific.in](mailto:accountable.manager@indopacific.in)
Indocopters: [info@indocopters.com](mailto:info@indocopters.com)
India Flysafe Aviation: [am@indiaflysafe.com](mailto:am@indiaflysafe.com)
Innxt Aviation: [innxtaviation@gmail.com](mailto:innxtaviation@gmail.com)
IRM Pvt. Ltd.: [alekh.jain@irmltd.co.in](mailto:alekh.jain@irmltd.co.in)
Jet Serve Aviation: [srola@jetaviation.co.in](mailto:srola@jetaviation.co.in)
Jhankar Aviation: [jhankaraviationops@gmail.com](mailto:jhankaraviationops@gmail.com)
Joyalukkas India: [am@joyalukkas.com](mailto:am@joyalukkas.com)
Kainos Aviation: [info@kainosaviation.com](mailto:info@kainosaviation.com)
Kairamya Aviation: [info@kairamyaair.com](mailto:info@kairamyaair.com)
Kakini Enterprises: [ceo@bluhorse-kepl.in](mailto:ceo@bluhorse-kepl.in)
KAN Aerofoil: [am@kanaero.com](mailto:am@kanaero.com)
Karnavati Aviation: [julian.dsouza@adani.com](mailto:julian.dsouza@adani.com)
Kelachandra Logistics: [uksharma@kelachandragroup.com](mailto:uksharma@kelachandragroup.com)
Kestrel Aviation: [AM@kestrel-aviation.com](mailto:AM@kestrel-aviation.com)
Khazana Jewellery: [am@kingjets.in](mailto:am@kingjets.in)
Kingscraft Aviation: [am@flykings.com](mailto:am@flykings.com)
Kyathi Climate Modification Consultants LLP: [am@flykings.com](mailto:am@flykings.com)
Lakeworkoffice Club: [abhinavtripathi@lakeworkoffice.com](mailto:abhinavtripathi@lakeworkoffice.com)
LCL Aviation (Ecojet): [am@lclaviation.com](mailto:am@lclaviation.com)
LMCS Infra Holdings: [acctmgr@flylotus.aero](mailto:acctmgr@flylotus.aero)
L & T Aviation Services: [ashutosh.v@larsentoubro.com](mailto:ashutosh.v@larsentoubro.com)
MAB Aviation: [areez.vakil@mabaviation.com](mailto:areez.vakil@mabaviation.com)
Maharaja Aviation: [info@maharajaaviation.com](mailto:info@maharajaaviation.com)
Mahindra Airways: [NISAL.NITIN@mahindra.com](mailto:NISAL.NITIN@mahindra.com)
Malhotra Helikopters: [ops@mhpl.in](mailto:ops@mhpl.in)
Mandke and Mandke Infrastructure: [info@sudhirmandke.com](mailto:info@sudhirmandke.com)
Media House DND: [am.dndmedia@gmail.com](mailto:am.dndmedia@gmail.com)
Modifi Aviations: [am@modifiaviations.com](mailto:am@modifiaviations.com)
MSPL Ltd.: [accountablemanager@mspllimited.com](mailto:accountablemanager@mspllimited.com)
Mytri Aviation: [am@mytriaviation.in](mailto:am@mytriaviation.in)
Navdurga Aviation: [am@navdurgaaviation.com](mailto:am@navdurgaaviation.com)
NIBE Aeronautics: [sourabh.jangid@nibeaeronautics.com](mailto:sourabh.jangid@nibeaeronautics.com)
Niraant Aviation: [Shamsher.sindhu@uskcapital.com](mailto:Shamsher.sindhu@uskcapital.com)
OSS Air Management: [sr.solanki@ossair.com](mailto:sr.solanki@ossair.com)
Pawan Hans: [jitendra.negi@pawanhans.co.in](mailto:jitendra.negi@pawanhans.co.in)
Pilgrimage Aviation: [info.pilgrimageaviation@gmail.com](mailto:info.pilgrimageaviation@gmail.com)
Pinnacle Air: [ceo@pinnacleair.in](mailto:ceo@pinnacleair.in)
Pioneer Flying Academy: [rajesh@pioneerflyingacademy.com](mailto:rajesh@pioneerflyingacademy.com)
Poonawalla Aviation: [poonawallaops@poonawallaaviation.com](mailto:poonawallaops@poonawallaaviation.com)
Pradhaan Air Express: [am@pradhaanair.com](mailto:am@pradhaanair.com)
Property Ventures (India): [sudeep.singh@skylightairways.com](mailto:sudeep.singh@skylightairways.com)
Rajas Aerosports and Adventures (Air Safari): [am@rajasaero.com](mailto:am@rajasaero.com)
Rajhans Infracon (India): [priyanshi.nair@rajhans.co.in](mailto:priyanshi.nair@rajhans.co.in)
Raymond Ltd. (Aviation Division): [raymond.accmgr@raymond.in](mailto:raymond.accmgr@raymond.in)
Redbird Airways: [opc@redbirdairways.com](mailto:opc@redbirdairways.com)
Redbird Flight Training Academy: [coo@redbirdaviation.com](mailto:coo@redbirdaviation.com)
Reliance Commercial Dealers: [k.unni@ril.com](mailto:k.unni@ril.com)
Reliance Transport & Travels: [Ajay.Kapur@reliancegroupindia.com](mailto:Ajay.Kapur@reliancegroupindia.com)
Rithwik Green Power and Aviation: [rithwikgreenpoweraviation@gmail.com](mailto:rithwikgreenpoweraviation@gmail.com)
RPS Aviation: [info@skysuites.in](mailto:info@skysuites.in)
RPSG Resources: [ravi.dargan@rpsg.in](mailto:ravi.dargan@rpsg.in)
Saarthi Airways: [info@saarthiairways.com](mailto:info@saarthiairways.com)
Saffron Strokes: [accountablemanager@saffronstrokes.com](mailto:accountablemanager@saffronstrokes.com)
Sai Construction: [aviation@sbalangroup.com](mailto:aviation@sbalangroup.com)
Sapphire Airlines: [am@sapphireair.in](mailto:am@sapphireair.in)
Shraddha Energy and Infraprojects: [aviation@shraddhagroup.org](mailto:aviation@shraddhagroup.org)
Shivan Aadithya Air Services: [jees.george@goldeneagle.aero](mailto:jees.george@goldeneagle.aero)
Simm Samm Airways: [ceo@simmsamm.com](mailto:ceo@simmsamm.com) and [ops@simmsamm.com](mailto:ops@simmsamm.com)
Span Air: [mail@span-air.com](mailto:mail@span-air.com)
Skyblue Aviation Services: [am@skyblue.aero](mailto:am@skyblue.aero)
Sky One Airways: [cdrram@skyoneairways.in](mailto:cdrram@skyoneairways.in)
SkyJets International: [am@aviaman.com](mailto:am@aviaman.com)
Smart Wings Aviation: [am@smartwingsaviation.com](mailto:am@smartwingsaviation.com)
Sparzana Aviation: [am@sparzana.com](mailto:am@sparzana.com)
SKB Infracons: [am.skbinfracons@gmail.com](mailto:am.skbinfracons@gmail.com)
Sobha Puravankara Aviation: [dhakshanamoorthi.s@spal.co.in](mailto:dhakshanamoorthi.s@spal.co.in)
Sreeji Aviation: [aviation@shreeji.in](mailto:aviation@shreeji.in)
Steamhouse India: [sndpmsh@outlook.com](mailto:sndpmsh@outlook.com)
Suhan Aviation: [rsasan@suhanaviation.com](mailto:rsasan@suhanaviation.com)
Syandan Aviation: [am@syandanaviation.com](mailto:am@syandanaviation.com)
TAI Jets: [manoj@titanaviation.aero](mailto:manoj@titanaviation.aero)
Taj Air: [mehernosh.kapadia@tajhotels.com](mailto:mehernosh.kapadia@tajhotels.com)
Tara Aviation Services: [am@taraaviation.com](mailto:am@taraaviation.com)
Target Air Services: [info@targetairservices.com](mailto:info@targetairservices.com)
Thumby Aviation: [captkingnair@yahoo.co.in](mailto:captkingnair@yahoo.co.in)
Trans Bharat Aviation: [accm@transbharat.in](mailto:accm@transbharat.in)
Transworld Jets: [aks@transworld.com](mailto:aks@transworld.com)
United Helicharters: [prakash@uhpl.in](mailto:prakash@uhpl.in)
Universal Airways: [rj@universalairways.in](mailto:rj@universalairways.in)
Vijayanand Travels: [vtplgmavn@gmail.com](mailto:vtplgmavn@gmail.com)
Vimaan Airlines: [accountablemgr@vimaanairlines.com](mailto:accountablemgr@vimaanairlines.com)
Ventura Airconnect: [am@flyairconnect.com](mailto:am@flyairconnect.com)
VSR Ventures: [vk@vsraviation.com](mailto:vk@vsraviation.com)
Wings Aviation: [qc.wings@gmail.com](mailto:qc.wings@gmail.com)
Zest Aviation: [sudeep@zestaviation.com](mailto:sudeep@zestaviation.com)`;

// Excluded companies / domains specified by user:
// "igone simmsamm airways, avocet ,iictechnologies.com,flapsaviation.in thes companies ignore"
const excludedKeywords = [
  'simmsamm',
  'avocet',
  'iictechnologies',
  'flapsaviation'
];

function isExcluded(line, company, email) {
  const lower = `${company} ${email} ${line}`.toLowerCase();
  return excludedKeywords.some(ex => lower.includes(ex));
}

const lines = rawData.split('\n');
const leads = [];
const excluded = [];
const seenEmails = new Set();

const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

lines.forEach(line => {
  line = line.trim();
  if (!line) return;

  const colonIdx = line.indexOf(':');
  let company = '';
  let rest = line;
  if (colonIdx !== -1) {
    company = line.substring(0, colonIdx).trim();
    rest = line.substring(colonIdx + 1);
  }

  const emailsFound = rest.match(emailRegex) || [];
  // Deduplicate matched emails in line (like in markdown links [email](mailto:email))
  const uniqueEmailsInLine = [...new Set(emailsFound.map(e => e.toLowerCase()))];

  uniqueEmailsInLine.forEach(email => {
    if (isExcluded(line, company, email)) {
      excluded.push({ company, email, reason: 'Excluded by user rule' });
      return;
    }

    if (!seenEmails.has(email)) {
      seenEmails.add(email);
      leads.push({
        company: company,
        email: email,
        name: 'Team',
        role: 'Aviation Operations / Charters'
      });
    }
  });
});

console.log(`Total valid leads extracted: ${leads.length}`);
console.log(`Excluded leads: ${excluded.length}`);
console.log('Excluded items:', excluded);

// Save to charter_leads.json and charter_leads.csv
fs.writeFileSync(
  path.join(__dirname, 'charter_leads.json'),
  JSON.stringify(leads, null, 2)
);

let csvContent = 'Company,Email,Name,Role\n';
leads.forEach(l => {
  csvContent += `"${l.company.replace(/"/g, '""')}","${l.email}","${l.name}","${l.role}"\n`;
});
fs.writeFileSync(path.join(__dirname, 'charter_leads.csv'), csvContent);

console.log('Successfully saved charter_leads.json and charter_leads.csv');
