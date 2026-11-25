// Fictional movies. Swap in your own titles, people and colors.
export const M=[
{id:1,t:"Midnight Lanterns",y:2024,g:"Drama",r:8.9,m:142,d:"Ines Varga",c:["Lena Okoye","Marcus Thorne","Yui Tanaka"],k:"sun",a:"#F5C518",b:"#B4231A",q:"Shot entirely between 10 pm and dawn.",o:"A lantern maker in a flooded city teaches one last apprentice before the tide takes the workshop."},
{id:2,t:"Neon Orchard",y:2025,g:"Sci-Fi",r:8.7,m:128,d:"Kofi Adair",c:["Mara Quinn","Teo Silva","Anika Rao"],k:"grid",a:"#5B7CFF",b:"#16103A",q:"Every fruit on screen was hand-lit with LEDs.",o:"On a failing orbital farm, a botanist finds trees that grow only when no one is watching."},
{id:3,t:"The Salt Ocean",y:2023,g:"Drama",r:8.5,m:151,d:"Ruth Calloway",c:["Idris Bell","Sofia Marin","Henrik Aas"],k:"waves",a:"#2EC4B6",b:"#0B2A3A",q:"The crew lived on a real fishing boat for 40 days.",o:"Three generations of salt harvesters argue over selling the last shoreline their family owns."},
{id:4,t:"Static Bloom",y:2025,g:"Horror",r:8.2,m:104,d:"Jonah Pike",c:["Dara Cole","Vik Menon","Tess Ardent"],k:"rings",a:"#FF4D4D",b:"#1A0508",q:"The sound design uses recordings of dead radio channels.",o:"A night-shift radio host starts receiving calls from listeners who are already in the room."},
{id:5,t:"Paper Kingdom",y:2022,g:"Comedy",r:8.1,m:97,d:"Priya Nair",c:["Omar Reyes","Bea Lindqvist","Chidi Obi"],k:"tri",a:"#3DDC97",b:"#0E3B2B",q:"Every set was built from cardboard and tape.",o:"A failing origami studio tries to win a royal contract by folding a full-size castle overnight."},
{id:6,t:"Letters to Lisbon",y:2024,g:"Romance",r:7.9,m:116,d:"Mateus Faro",c:["Clara Dias","Noah Whitfield","Amara Neves"],k:"sun",a:"#FF7AB6",b:"#3A0F2B",q:"The letters on screen were written by hand by the cast.",o:"Two strangers share one mailbox across decades and slowly fall for each other’s handwriting."},
{id:7,t:"Last Signal to Mars",y:2023,g:"Sci-Fi",r:8.4,m:134,d:"Elena Voss",c:["Ravi Anand","Jules Park","Greta Holm"],k:"rings",a:"#FF9F1C",b:"#2A0F05",q:"The spacecraft set rotated on a real gimbal.",o:"A comms officer is the only crew member left who can hear the message from home."},
{id:8,t:"Dinner at Eleven",y:2022,g:"Comedy",r:7.8,m:101,d:"Sam Okafor",c:["Lou Fernandez","Hana Sato","Dev Malhotra"],k:"tri",a:"#FFD166",b:"#33210A",q:"The entire film was shot in one continuous take.",o:"A chef cooks a ten-course meal for guests who all secretly plan to leave before dessert."},
{id:9,t:"Hollow Pines",y:2024,g:"Horror",r:7.7,m:99,d:"Mira Castellan",c:["Beck Rowan","Nia Adeyemi","Tomas Brandt"],k:"waves",a:"#B388FF",b:"#150A2A",q:"Filmed in a forest with no artificial light at night.",o:"Four hikers follow a trail that was not on the map yesterday and does not end."},
{id:10,t:"Tuesday, Again",y:2025,g:"Romance",r:8.0,m:109,d:"Leo Marchetti",c:["Isla Ford","Kenji Mori","Rosa Vidal"],k:"grid",a:"#FF6F91",b:"#2B0F1F",q:"The same café was redressed for 31 different days.",o:"A baker keeps living the same Tuesday until she stops trying to fix it and asks a customer to stay."},
{id:11,t:"Glass Harbor",y:2021,g:"Drama",r:8.3,m:138,d:"Aditi Rao",c:["Samir Qadri","Eva Lund","Tobias Wren"],k:"waves",a:"#4CC9F0",b:"#071B2B",q:"Won three festival awards before its theatrical release.",o:"A harbor pilot’s memory fails just as a storm brings the biggest ship of his career."},
{id:12,t:"Orbit of Small Things",y:2024,g:"Sci-Fi",r:7.9,m:122,d:"Yuki Mori",c:["Ben Achebe","Lila Voss","Corin Wade"],k:"sun",a:"#9BF6FF",b:"#0A1B33",q:"Props were scanned from objects found in real attics.",o:"An archivist on a space station catalogues household objects that keep returning from Earth."}
];
export const GEN={All:"#F5C518",Drama:"#F2994A",["Sci-Fi"]:"#5B7CFF",Horror:"#FF4D4D",Romance:"#FF7AB6",Comedy:"#3DDC97"};
export const ART={
sun:'<circle cx="100" cy="115" r="58" fill="rgba(255,255,255,.88)"/><path d="M0 230l55-60 45 40 50-70 50 90v70H0z" fill="rgba(0,0,0,.45)"/>',
grid:'<g stroke="rgba(255,255,255,.35)" stroke-width="1.5">'+[0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*30} 0V300M0 ${i*40}H200"/>`).join("")+'</g><circle cx="100" cy="120" r="44" fill="none" stroke="#fff" stroke-width="6"/>',
rings:[70,52,34,16].map(r=>`<circle cx="100" cy="120" r="${r}" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="5"/>`).join(""),
waves:[0,1,2,3,4].map(i=>`<path d="M0 ${130+i*22}q25-24 50 0t50 0t50 0t50 0" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="5"/>`).join(""),
tri:'<path d="M100 40l75 130H25z" fill="rgba(255,255,255,.85)"/><path d="M100 80l45 80H55z" fill="rgba(0,0,0,.4)"/>'};

export const byId = (id) => M.find((m) => m.id === id);

// Same poster as the <Poster /> component, as an HTML string (used for flying and trail effects).
export const posterHTML = (m) =>
  `<div class="poster" style="background:linear-gradient(160deg,${m.a},${m.b})"><svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${ART[m.k]}</svg><b>${m.t}</b><i>${m.y}</i></div>`;

