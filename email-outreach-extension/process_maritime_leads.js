const fs = require('fs');
const path = require('path');

const rawInput = `[info@aegisyachts.com](mailto:info@aegisyachts.com)
[info@mbcyachts.com](mailto:info@mbcyachts.com)
[sales@mbcyachts.com](mailto:sales@mbcyachts.com)
[chartering@mbcyachts.com](mailto:chartering@mbcyachts.com)
[dubai@bluewateryachting.com](mailto:dubai@bluewateryachting.com)
[management@bluewateryachting.com](mailto:management@bluewateryachting.com)
[peter@bluewateryachting.com](mailto:peter@bluewateryachting.com)
[irina@bluewateryachting.com](mailto:irina@bluewateryachting.com)
[tatiana@bluewateryachting.com](mailto:tatiana@bluewateryachting.com)
[kseniia@bluewateryachting.com](mailto:kseniia@bluewateryachting.com)
[jaamaa@jjmarine.ae](mailto:jaamaa@jjmarine.ae)
[charter@skywalker.ae](mailto:charter@skywalker.ae)
[marketing@skywalker.ae](mailto:marketing@skywalker.ae)
[management@skywalker.ae](mailto:management@skywalker.ae)
[ops@aquamor.ae](mailto:ops@aquamor.ae)
[info@aquamor.ae](mailto:info@aquamor.ae)
[info@yachtinghouse.com](mailto:info@yachtinghouse.com)
[contact@yachtcharterdubai.ae](mailto:contact@yachtcharterdubai.ae)
[yachtcharterdubai.ae@gmail.com](mailto:yachtcharterdubai.ae@gmail.com)
[contact@dubaiyachts.com](mailto:contact@dubaiyachts.com)
[info@ocean360.ae](mailto:info@ocean360.ae)
[marinearctiv@gmail.com](mailto:marinearctiv@gmail.com)
[navalarcticmarine@gmail.com](mailto:navalarcticmarine@gmail.com)
[samha@nordmarinuae.com](mailto:samha@nordmarinuae.com)
[shella@nordmarinuae.com](mailto:shella@nordmarinuae.com)
[shafeeq.m@nordmarinuae.com](mailto:shafeeq.m@nordmarinuae.com)
[paul@nordmarinuae.com](mailto:paul@nordmarinuae.com)
[essa_b.j@hotmail.com](mailto:essa_b.j@hotmail.com)
[info@oceanicsre.com](mailto:info@oceanicsre.com)
[ed@oceanicsre.com](mailto:ed@oceanicsre.com)
[pacitech@eim.ae](mailto:pacitech@eim.ae)
[accounts@pacitechme.com](mailto:accounts@pacitechme.com)
[admin@pacitechme.com](mailto:admin@pacitechme.com)
[pacifice@emirates.net.ae](mailto:pacifice@emirates.net.ae)
[sales@pi-marine.com](mailto:sales@pi-marine.com)
[sodhi1683@gmail.com](mailto:sodhi1683@gmail.com)
[Dierdre.Pinto@dpworld.com](mailto:Dierdre.Pinto@dpworld.com)
[Taher.Murad@dpworld.com](mailto:Taher.Murad@dpworld.com)
[OmarIbrahim.AlFalasi@dpworld.com](mailto:OmarIbrahim.AlFalasi@dpworld.com)
[M.ALGAITHI@SILVER-YACHTS.COM](mailto:M.ALGAITHI@SILVER-YACHTS.COM)
[SUBAIR.CA@SILVER-YACHTS.COM](mailto:SUBAIR.CA@SILVER-YACHTS.COM)
[SAXENAS@SMARTHYDROBOTICS.COM](mailto:SAXENAS@SMARTHYDROBOTICS.COM)
[SACHIN30JULY@GMAIL.COM](mailto:SACHIN30JULY@GMAIL.COM)
[BASHEER@STABLEMARINE.COM](mailto:BASHEER@STABLEMARINE.COM)
[INFO@STABLEMARINE.COM](mailto:INFO@STABLEMARINE.COM)
[info@navispec.com](mailto:info@navispec.com)
[info.uae@noahmarinegroup.com],charter@xclusiveyachts.com
info@dubaiyachtbooking.com
info@malayachts.ae
info@symanyachtrentaldubai.com
info@dubaiboatcharter.com
charter@arabianyachting.com
charter@empireyachts.ae
info@yachtcharterdubai.club
info@royalpath.ae
emirates@royalyachting.ae
info@lemonwaves.ae
yachtcharterdubai.ae@gmail.com
seaseakersyachts@gmail.com
booking@goldsyacht.com
charter@luxuryseaboats.com
dubai@bluewateryachting.com
info@eliteluxuryyacht.com
info@alaliyachts.com
booking@rsyyachts.com
info@elegantyachtrental.com
contact@dubaiyachts.com
no.1yacht@gmail.com
charter@primeyachts.ae
info@mbcyachts.com
charter@centauruscharter.com
booking@dxbyachts.ae
info@royalchampionyachts.com
booking@charterarabia.com
operations@elitepearlcharter.com
charter@premiumyachtsdubai.com
reservation@asfaryachts.com
info@seaescape.ae
charter@d3yachts.com
info@thinkoneyachts.com
charter@conwy-yachts.ae
info@amwajyachts.com
booking@cozmoyachts.com
info@nanjeyachts.com
charter@championyachting.ae
info@aquariusyacht.ae
yachts@oneclickdrive.com
info@alshalimarine.com
info@deepseacraft.ae
charter@marasiyachts.com
booking@silverstaryachts.ae
dubai@westcoastmarine.ae
charter@marlinyachting.ae
info@oceandream.ae
yacht@falconoasis.com
acury-yachts@acury.com
booking@dubaicharteryachts.com
charter@yachthunter.com
info@maxoel.com
info@skymarineyachts.com
info@thearabianlife.ae
info@theyachtbrothers.com
info@wazhir.com
info@anchorsbook.com
info@bookanyboat.com
info@dayoutdubai.ae
booking@yachtrentalindubai.com
info@dubaimarinayachts.com
asad@asadmarine.com
yachtsiconic@gmail.com
elonyachts@gmail.com
hababiyachts@gmail.com
info@aquamorchartering.com
gm@petyachts.com
info@marine-charter-concept.com
nour@fleet-ae.com
info@sevenyachts.ae
charter@nauticalyachts.ae
booking@easyyacht.ae
charter@gulfcraftinc.com
hichamkoyooo@gmail.com
info@xtlmarine.ae
sultanphoenix@gmail.com
wissamy@gmail.com
info@oceanicyachts.ae
sharktourism@gmail.com
info@alrubbanmarine.com
info@shipwreckedparties.com
extremecharter@gmail.com
daynightdubai@gmail.com
luxuryuae1@gmail.com
info@volumeyachts.ae
sales@gulfboatstrading.com
info@alwaslyachts.com
charter@xtremeyachts.com
booking@asfaryachts.com
info@deepseaadventures.ae
charter@marinamoon.ae
info@glowmarine.ae
info@pearlseas.ae
booking@voyageyachts.com
info@anchordown.ae
charter@apexyachts.ae
management@bluewateryachting.com
booking@cozymarine.ae
info@silverwaves.ae
contact@stellaryachts.ae
info@marinaescape.ae
charter@blueocean.ae
info@vanguardsuperyachts.com
booking@oasiscruise.ae
info@horizoncharters.ae
charter@mermaidyachts.ae
info@navigatorboats.ae
booking@zenithyachts.ae
operations@aquariusyacht.ae
booking@marasiyachts.com
charter@westcoastmarine.ae
info@skylineyachts.ae
info@directboatdubai.com
booking@falconoasis.com
charter@avantiyachts.ae
info@velocitymarinedxb.com
booking@alshujaatyachts.com
info@royalstaryachts.ae
charter@alphamaritime.ae
info@deepblueseadubai.com
info@nauticacharters.ae
charter@seabreezedxb.ae
charter@maximusyachts.com
booking@destinyyachts.ae
info@bluewatermarinedxb.com
info@prestigeyachts.ae
booking@aurayachts.com
alkabeermarine@gmail.com
charter@oceancrest.ae
info@sirenyachts.ae
charter@waterlinkmarine.com
booking@majesticcruise.ae
charter@voyagerdxb.com
info@asmarleyyachts.com
cozycoveyachts@gmail.com
booking@goldenoceandxb.com
info@legacyyachts.ae
charter@silverlinedxb.com
info@stellarwaves.ae
info@dubaipremiumboat.com
charter@blackpearlcharter.com
booking@neptuneyachts.ae
charter@apexmarinedxb.com
info@avantimarine.ae
info@directyachtsdubai.com
seahawktourism@gmail.com
info@alsahabyachts.ae
booking@xtremefleet.ae
charter@horizonmaritimedxb.com
info@mermaidpearl.ae
info@navigatormarine.ae
charter@zenithmarinedxb.com
booking@aquariusmarinedxb.com
info@marasiluxuryyachts.com
booking@westcoastmarine.ae
charter@skylineyachts.ae
charter@falconoasis.com
ops@eliteyachtbooking.com
charter@malayachts.ae
charter@symanyachtrentaldubai.com
booking@dubaiboatcharter.com
booking@arabianyachting.com
booking@empireyachts.ae
booking@yachtcharterdubai.club
charter@royalpath.ae
bd@gulfcraftinc.com
charter@royalyachts.ae
ops@xtlmarine.ae
charter@princessyachtsgulf.com
charter@superyachtme.com
booking@oceanicyachts.ae
booking@sharktourism.com
charter@alrubbanmarine.com
booking@shipwreckedparties.com
booking@extremecharter.com
charter@daynightdubai.ae
booking@luxuryuaemarine.com
ops@volumeyachts.ae
info@gulfboatstrading.com
booking@alwaslyachts.com
ops@xtremeyachts.com
sales@asfaryachts.com
booking@deepseaadventures.ae
ops@marinamoon.ae
ops@glowmarine.ae
booking@pearlseas.ae
info@voyageyachts.com
charter@anchordown.ae
ops@apexyachts.ae
charter@bluewateryachting.com
ops@cozymarine.ae
ops@silverwaves.ae
info@stellaryachts.ae
booking@marinaescape.ae
booking@blueocean.ae
charter@vanguardsuperyachts.com
info@oasiscruise.ae
booking@horizoncharters.ae
info@mermaidyachts.ae
booking@navigatorboats.ae
info@zenithyachts.ae
charter@aquariusyacht.ae
info@marasiyachts.com
info@westcoastmarine.ae
booking@skylineyachts.ae
booking@directboatdubai.com
info@falconoasis.com
booking@avantiyachts.ae
booking@velocitymarinedxb.com
info@alshujaatyachts.com
booking@royalstaryachts.ae
info@alphamaritime.ae
booking@deepblueseadubai.com
charter@nauticacharters.ae
info@seabreezedxb.ae
charter@desertroseyachts.ae
info@columbusyachts.ae
info@marineryachts.com
charter@oceanvoyager.ae
booking@silvercreekdxb.com
booking@meridianyachts.ae
info@jumeirahmarine.ae
ops@voyagermarine.ae
charter@deepseacruising.com
booking@bluelagoonyachts.com
management@apexyachts.ae
info@almahayachts.ae
booking@elitewavecharter.com
charter@prestigeyachts.ae
ops@nauticalyachts.ae
charter@stellarwaves.ae
info@dubaicoastal.ae
booking@anchormarinedxb.com
charter@glowmarine.ae
ops@royalyachts.ae
ops@marasiyachts.com
ops@skylineyachts.ae
ops@falconoasis.com
booking@avantimarine.ae
charter@alshujaatyachts.com
charter@royalstaryachts.ae
booking@alphamaritime.ae
ops@deepblueseadubai.com
ops@nauticacharters.ae
booking@seabreezedxb.ae
info@destinyyachts.ae
ops@legacyyachts.ae
info@silverlinedxb.com
booking@dubaipremiumboat.com
ops@blackpearlcharter.com
info@neptuneyachts.ae
info@apexmarinedxb.com
charter@directyachtsdubai.com
charter@seahawktourism.com
charter@alsahabyachts.ae
info@xtremefleet.ae
ops@horizonmaritimedxb.com
booking@mermaidpearl.ae
ops@navigatormarine.ae
info@aquariusmarinedxb.com
charter@marasiluxuryyachts.com
ops@westcoastmarine.ae
charter@arabiangulfyachts.ae
info@marinakeyyachts.com
booking@oceanvistadxb.com
charter@royalcrestmarine.ae
info@silveranchordxb.com
booking@bluehorizon.ae
charter@jumeirahwaves.ae
ops@voyagemarinedxb.com
info@deepseacruising.ae
charter@apexmaritime.ae
ops@almahayachts.ae
info@elitewavecharter.com
booking@prestigeyachts.ae
info@nauticalyachts.ae
booking@stellarwaves.ae
ops@dubaicoastal.ae
charter@anchormarinedxb.com
booking@glowmarine.ae
booking@royalyachts.ae
booking@aquariusyacht.ae
management@falconoasis.com
ops@avantimarine.ae
charter@velocitymarinedxb.com
management@alshujaatyachts.com
management@royalstaryachts.ae
ops@alphamaritime.ae
booking@nauticacharters.ae
ops@destinyyachts.ae
booking@legacyyachts.ae
ops@silverlinedxb.com
ops@dubaipremiumboat.com
info@blackpearlcharter.com
ops@neptuneyachts.ae
ops@apexmarinedxb.com
info@seahawktourism.com
ops@alsahabyachts.ae
charter@xtremefleet.ae
info@horizonmaritimedxb.com
charter@mermaidpearl.ae
charter@navigatormarine.ae
ops@zenithmarinedxb.com
management@aquariusmarinedxb.com
management@marasiluxuryyachts.com
info@desertroseyachts.ae
charter@columbusyachts.ae
ops@marineryachts.com
info@oceanvoyager.ae
info@silvercreekdxb.com
ops@meridianyachts.ae
charter@jumeirahmarine.ae
ops@voyageyachts.com
info@deepseacruising.com
info@bluelagoonyachts.com
charter@almahayachts.ae
charter@elitewavecharter.com
ops@prestigeyachts.ae
management@stellarwaves.ae
charter@dubaicoastal.ae
info@anchormarinedxb.com
management@glowmarine.ae
info@royalyachts.ae
management@skylineyachts.ae
management@avantimarine.ae
ops@alshujaatyachts.com
ops@royalstaryachts.ae
management@deepblueseadubai.com
management@nauticacharters.ae
ops@seabreezedxb.ae
charter@destinyyachts.ae
management@legacyyachts.ae
booking@silverlinedxb.com
management@dubaipremiumboat.com
management@neptuneyachts.ae
management@apexmarinedxb.com
ops@directyachtsdubai.com
ops@seahawktourism.com
management@alsahabyachts.ae
management@xtremefleet.ae
ops@mermaidpearl.ae
management@zenithmarinedxb.com
ops@aquariusmarinedxb.com
ops@marasiluxuryyachts.com
booking@desertroseyachts.ae
booking@marineryachts.com
ops@oceanvoyager.ae
management@silvercreekdxb.com
info@meridianyachts.ae
booking@jumeirahmarine.ae
management@bluelagoonyachts.com
sales@apexyachts.ae
sales@prestigeyachts.ae
booking@nauticalyachts.ae
management@dubaicoastal.ae
ops@anchormarinedxb.com
management@aquariusyacht.ae
sales@skylineyachts.ae
ops@velocitymarinedxb.com
charter@legacyyachts.ae
management@silverlinedxb.com
management@blackpearlcharter.com
charter@neptuneyachts.ae
sales@apexmarinedxb.com
booking@alsahabyachts.ae
sales@horizonmaritimedxb.com
management@mermaidpearl.ae
booking@navigatormarine.ae
info@zenithmarinedxb.com
charter@aquariusmarinedxb.com
ops@columbusyachts.ae
charter@silvercreekdxb.com
ops@jumeirahmarine.ae
ops@bluelagoonyachts.com
info@apexyachts.ae
booking@almahayachts.ae
ops@elitewavecharter.com
ops@xtremefleet.ae
ops@desertroseyachts.ae
[info.uae@noahmarinegroup.com]
[info@shipsquad.me](mailto:info@shipsquad.me)
[purchase@premiermarine.ae](mailto:purchase@premiermarine.ae)
[info@sysc.ae](mailto:info@sysc.ae)
[dubai@jmsyachting.com](mailto:dubai@jmsyachting.com)
[info@marine.ae](mailto:info@marine.ae)
[alexander.souabni@gulfcraftinc.com](mailto:alexander.souabni@gulfcraftinc.com)
[nina@sunreef.com](mailto:nina@sunreef.com)`;

// Extract emails using regex
const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const matches = rawInput.match(emailRegex) || [];

// Domain to friendly company name helper
function inferCompanyFromEmail(email) {
  const parts = email.split('@');
  if (parts.length < 2) return 'Maritime Partner';
  const domain = parts[1].toLowerCase();
  
  // Custom brand mappings
  const domainMap = {
    'aegisyachts.com': 'Aegis Yachts',
    'mbcyachts.com': 'MBC Yachts',
    'bluewateryachting.com': 'Bluewater Yachting',
    'jjmarine.ae': 'JJ Marine',
    'skywalker.ae': 'Skywalker Yachts',
    'aquamor.ae': 'Aquamor Marine',
    'aquamorchartering.com': 'Aquamor Chartering',
    'yachtinghouse.com': 'Yachting House',
    'yachtcharterdubai.ae': 'Yacht Charter Dubai',
    'dubaiyachts.com': 'Dubai Yachts',
    'ocean360.ae': 'Ocean 360',
    'nordmarinuae.com': 'Nord Marin UAE',
    'oceanicsre.com': 'Oceanics Real Estate & Marine',
    'pacitech.ae': 'Pacitech Marine',
    'pacitechme.com': 'Pacitech Marine Middle East',
    'pi-marine.com': 'PI Marine',
    'dpworld.com': 'DP World',
    'silver-yachts.com': 'SilverYachts',
    'smarthydrobotics.com': 'Smart Hydrobotics',
    'stablemarine.com': 'Stable Marine',
    'navispec.com': 'Navispec Marine',
    'noahmarinegroup.com': 'Noah Marine Group',
    'xclusiveyachts.com': 'Xclusive Yachts',
    'dubaiyachtbooking.com': 'Dubai Yacht Booking',
    'malayachts.ae': 'Mala Yachts',
    'symanyachtrentaldubai.com': 'Syman Yacht Rental Dubai',
    'dubaiboatcharter.com': 'Dubai Boat Charter',
    'arabianyachting.com': 'Arabian Yachting',
    'empireyachts.ae': 'Empire Yachts',
    'yachtcharterdubai.club': 'Yacht Charter Dubai Club',
    'royalpath.ae': 'Royal Path Marine',
    'royalyachting.ae': 'Royal Yachting',
    'lemonwaves.ae': 'Lemon Waves',
    'goldsyacht.com': 'Golds Yacht',
    'luxuryseaboats.com': 'Luxury Sea Boats',
    'eliteluxuryyacht.com': 'Elite Luxury Yacht',
    'alaliyachts.com': 'Al Ali Yachts',
    'rsyyachts.com': 'RSY Yachts',
    'elegantyachtrental.com': 'Elegant Yacht Rental',
    'primeyachts.ae': 'Prime Yachts',
    'centauruscharter.com': 'Centaurus Charter',
    'dxbyachts.ae': 'DXB Yachts',
    'royalchampionyachts.com': 'Royal Champion Yachts',
    'charterarabia.com': 'Charter Arabia',
    'elitepearlcharter.com': 'Elite Pearl Charter',
    'premiumyachtsdubai.com': 'Premium Yachts Dubai',
    'asfaryachts.com': 'Asfar Yachts',
    'seaescape.ae': 'Sea Escape',
    'd3yachts.com': 'D3 Yachts',
    'thinkoneyachts.com': 'Think One Yachts',
    'conwy-yachts.ae': 'Conwy Yachts',
    'amwajyachts.com': 'Amwaj Yachts',
    'cozmoyachts.com': 'Cozmo Yachts',
    'nanjeyachts.com': 'Nanje Yachts',
    'championyachting.ae': 'Champion Yachting',
    'aquariusyacht.ae': 'Aquarius Yacht',
    'oneclickdrive.com': 'OneClickDrive Marine',
    'alshalimarine.com': 'Al Shali Marine',
    'deepseacraft.ae': 'Deep Sea Craft',
    'marasiyachts.com': 'Marasi Yachts',
    'silverstaryachts.ae': 'Silver Star Yachts',
    'westcoastmarine.ae': 'West Coast Marine',
    'marlinyachting.ae': 'Marlin Yachting',
    'oceandream.ae': 'Ocean Dream Yachts',
    'falconoasis.com': 'Falcon Oasis',
    'acury.com': 'Acury Yachts',
    'dubaicharteryachts.com': 'Dubai Charter Yachts',
    'yachthunter.com': 'Yacht Hunter',
    'maxoel.com': 'Maxoel Yachts',
    'skymarineyachts.com': 'Sky Marine Yachts',
    'thearabianlife.ae': 'The Arabian Life',
    'theyachtbrothers.com': 'The Yacht Brothers',
    'wazhir.com': 'Wazhir Yachts',
    'anchorsbook.com': 'AnchorsBook',
    'bookanyboat.com': 'BookAnyBoat',
    'dayoutdubai.ae': 'Day Out Dubai',
    'yachtrentalindubai.com': 'Yacht Rental In Dubai',
    'dubaimarinayachts.com': 'Dubai Marina Yachts',
    'asadmarine.com': 'Asad Marine',
    'petyachts.com': 'Pet Yachts',
    'marine-charter-concept.com': 'Marine Charter Concept',
    'fleet-ae.com': 'Fleet AE',
    'sevenyachts.ae': 'Seven Yachts',
    'nauticalyachts.ae': 'Nautical Yachts',
    'easyyacht.ae': 'Easy Yacht',
    'gulfcraftinc.com': 'Gulf Craft Inc.',
    'xtlmarine.ae': 'XTL Marine',
    'oceanicyachts.ae': 'Oceanic Yachts',
    'alrubbanmarine.com': 'Al Rubban Marine',
    'shipwreckedparties.com': 'Shipwrecked Parties',
    'volumeyachts.ae': 'Volume Yachts',
    'gulfboatstrading.com': 'Gulf Boats Trading',
    'alwaslyachts.com': 'Al Wasl Yachts',
    'xtremeyachts.com': 'Xtreme Yachts',
    'deepseaadventures.ae': 'Deep Sea Adventures',
    'marinamoon.ae': 'Marina Moon',
    'glowmarine.ae': 'Glow Marine',
    'pearlseas.ae': 'Pearl Seas',
    'voyageyachts.com': 'Voyage Yachts',
    'anchordown.ae': 'Anchor Down Yachts',
    'apexyachts.ae': 'Apex Yachts',
    'cozymarine.ae': 'Cozy Marine',
    'silverwaves.ae': 'Silver Waves',
    'stellaryachts.ae': 'Stellar Yachts',
    'marinaescape.ae': 'Marina Escape',
    'blueocean.ae': 'Blue Ocean Yachts',
    'vanguardsuperyachts.com': 'Vanguard Superyachts',
    'oasiscruise.ae': 'Oasis Cruise',
    'horizoncharters.ae': 'Horizon Charters',
    'mermaidyachts.ae': 'Mermaid Yachts',
    'navigatorboats.ae': 'Navigator Boats',
    'zenithyachts.ae': 'Zenith Yachts',
    'skylineyachts.ae': 'Skyline Yachts',
    'directboatdubai.com': 'Direct Boat Dubai',
    'avantiyachts.ae': 'Avanti Yachts',
    'velocitymarinedxb.com': 'Velocity Marine DXB',
    'alshujaatyachts.com': 'Al Shujaat Yachts',
    'royalstaryachts.ae': 'Royal Star Yachts',
    'alphamaritime.ae': 'Alpha Maritime',
    'deepblueseadubai.com': 'Deep Blue Sea Dubai',
    'nauticacharters.ae': 'Nautica Charters',
    'seabreezedxb.ae': 'Sea Breeze DXB',
    'maximusyachts.com': 'Maximus Yachts',
    'destinyyachts.ae': 'Destiny Yachts',
    'bluewatermarinedxb.com': 'Bluewater Marine DXB',
    'prestigeyachts.ae': 'Prestige Yachts',
    'aurayachts.com': 'Aura Yachts',
    'oceancrest.ae': 'Ocean Crest Yachts',
    'sirenyachts.ae': 'Siren Yachts',
    'waterlinkmarine.com': 'Waterlink Marine',
    'majesticcruise.ae': 'Majestic Cruise',
    'voyagerdxb.com': 'Voyager DXB',
    'asmarleyyachts.com': 'Asmarley Yachts',
    'goldenoceandxb.com': 'Golden Ocean DXB',
    'legacyyachts.ae': 'Legacy Yachts',
    'silverlinedxb.com': 'Silverline DXB',
    'stellarwaves.ae': 'Stellar Waves',
    'dubaipremiumboat.com': 'Dubai Premium Boat',
    'blackpearlcharter.com': 'Black Pearl Charter',
    'neptuneyachts.ae': 'Neptune Yachts',
    'apexmarinedxb.com': 'Apex Marine DXB',
    'avantimarine.ae': 'Avanti Marine',
    'directyachtsdubai.com': 'Direct Yachts Dubai',
    'alsahabyachts.ae': 'Al Sahab Yachts',
    'xtremefleet.ae': 'Xtreme Fleet',
    'horizonmaritimedxb.com': 'Horizon Maritime DXB',
    'mermaidpearl.ae': 'Mermaid Pearl',
    'navigatormarine.ae': 'Navigator Marine',
    'zenithmarinedxb.com': 'Zenith Marine DXB',
    'aquariusmarinedxb.com': 'Aquarius Marine DXB',
    'marasiluxuryyachts.com': 'Marasi Luxury Yachts',
    'eliteyachtbooking.com': 'Elite Yacht Booking',
    'royalyachts.ae': 'Royal Yachts',
    'princessyachtsgulf.com': 'Princess Yachts Gulf',
    'superyachtme.com': 'Superyacht Middle East',
    'sharktourism.com': 'Shark Tourism',
    'luxuryuaemarine.com': 'Luxury UAE Marine',
    'desertroseyachts.ae': 'Desert Rose Yachts',
    'columbusyachts.ae': 'Columbus Yachts',
    'marineryachts.com': 'Mariner Yachts',
    'oceanvoyager.ae': 'Ocean Voyager',
    'silvercreekdxb.com': 'Silver Creek DXB',
    'meridianyachts.ae': 'Meridian Yachts',
    'jumeirahmarine.ae': 'Jumeirah Marine',
    'voyagermarine.ae': 'Voyager Marine',
    'deepseacruising.com': 'Deep Sea Cruising',
    'deepseacruising.ae': 'Deep Sea Cruising',
    'bluelagoonyachts.com': 'Blue Lagoon Yachts',
    'almahayachts.ae': 'Al Maha Yachts',
    'elitewavecharter.com': 'Elite Wave Charter',
    'dubaicoastal.ae': 'Dubai Coastal',
    'anchormarinedxb.com': 'Anchor Marine DXB',
    'arabiangulfyachts.ae': 'Arabian Gulf Yachts',
    'marinakeyyachts.com': 'Marina Key Yachts',
    'oceanvistadxb.com': 'Ocean Vista DXB',
    'royalcrestmarine.ae': 'Royal Crest Marine',
    'silveranchordxb.com': 'Silver Anchor DXB',
    'bluehorizon.ae': 'Blue Horizon',
    'jumeirahwaves.ae': 'Jumeirah Waves',
    'voyagemarinedxb.com': 'Voyage Marine DXB',
    'apexmaritime.ae': 'Apex Maritime',
    'shipsquad.me': 'ShipSquad Marine',
    'premiermarine.ae': 'Premier Marine',
    'sysc.ae': 'SYSC Marine',
    'jmsyachting.com': 'JMS Yachting',
    'marine.ae': 'Marine.ae',
    'sunreef.com': 'Sunreef Yachts'
  };

  if (domainMap[domain]) return domainMap[domain];

  // If generic webmail (gmail/hotmail/outlook), infer from prefix or fallback
  if (domain.includes('gmail') || domain.includes('hotmail') || domain.includes('outlook') || domain.includes('yahoo')) {
    const user = parts[0].replace(/[._0-9-]/g, ' ').trim();
    if (user.toLowerCase().includes('yacht') || user.toLowerCase().includes('marine') || user.toLowerCase().includes('charter')) {
      return user.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Dubai';
    }
    return 'Yacht Charter Team';
  }

  // Fallback: clean domain name
  const namePart = domain.split('.')[0];
  return namePart.charAt(0).toUpperCase() + namePart.slice(1) + ' Marine';
}

const seen = new Set();
const leads = [];

matches.forEach(rawEmail => {
  const email = rawEmail.toLowerCase().trim();
  if (!seen.has(email)) {
    seen.add(email);
    const company = inferCompanyFromEmail(email);
    leads.push({
      company: company,
      email: email,
      name: 'Team',
      role: 'Yacht Charter / Fleet Operations'
    });
  }
});

console.log(`Total Maritime Marine leads extracted: ${leads.length}`);

// Output leads summary
fs.writeFileSync(
  path.join(__dirname, 'maritime_leads.json'),
  JSON.stringify(leads, null, 2)
);

let csvContent = 'Company,Email,Name,Role\n';
leads.forEach(l => {
  csvContent += `"${l.company.replace(/"/g, '""')}","${l.email}","${l.name}","${l.role}"\n`;
});
fs.writeFileSync(path.join(__dirname, 'maritime_leads.csv'), csvContent);

// Also generate the javascript bundle for the extension popup and background
const jsContent = `// Pre-loaded NP Groups Maritime Marine & Yacht Charter Leads (${leads.length} contacts)
window.MARITIME_LEADS_DATA = ${JSON.stringify(leads, null, 2)};
if (typeof self !== 'undefined') {
  self.MARITIME_LEADS_DATA = window.MARITIME_LEADS_DATA;
}
`;

fs.writeFileSync(path.join(__dirname, 'popup', 'maritime_leads_data.js'), jsContent);
fs.writeFileSync(path.join(__dirname, 'background', 'maritime_leads_data.js'), jsContent);

console.log('Successfully saved:');
console.log(' - maritime_leads.json');
console.log(' - maritime_leads.csv');
console.log(' - popup/maritime_leads_data.js');
console.log(' - background/maritime_leads_data.js');
