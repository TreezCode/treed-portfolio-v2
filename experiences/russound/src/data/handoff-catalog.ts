export type FamilyId = 'audio' | 'amplifiers' | 'speakers' | 'control';
export type ProductUse = 'whole-home' | 'one-room' | 'indoors' | 'outdoors' | 'tv' | 'control';
export interface ReviewProduct {
  id: string; name: string; family: FamilyId; group: string; uses: ProductUse[];
  image: string; href: string; source: string; description: string;
  aliases?: string[]; manual?: string; legacy?: boolean; discoveryFamilies?: FamilyId[];
}
export const reviewFamilies = [
  { id:'audio', name:'Audio systems', copy:'Whole-home controllers and music streaming.', image:'/oct27/smz8.webp', href:'/audio-systems/', filter:'/catalog/?family=audio', examples:['SMZ8'], links:[
    {name:'Multi-Room Controllers',href:'/audio-systems/#multiroom'},
    {name:'Streamers',href:'/audio-systems/#streaming'},
    {name:'VoicePlay',href:'https://russound.com/audio-systems/voiceplay/'},
    {name:'Commercial Audio',href:'https://russound.com/audio-systems/commercial-audio/'}
  ], allHref:'https://russound.com/audio-systems/', feature:'SMZ8', featureCopy:'Whole-home sound starts here.' },
  { id:'amplifiers', name:'Amplifiers', copy:'Power for the way your system is designed.', image:'/oct27/amplifier.webp', href:'/catalog/?family=amplifiers', filter:'/catalog/?family=amplifiers', examples:['D1290'], links:[
    {name:'Multichannel Amplifiers',href:'/catalog/?family=amplifiers&group=multichannel'},
    {name:'Two-Channel (Stereo Amplifiers)',href:'https://russound.com/amplifiers/two-channel-amplifiers/'},
    {name:'Mini AVRs',href:'https://russound.com/amplifiers/mini-avrs/'}
  ], allHref:'https://russound.com/amplifiers/', feature:'D1290', featureCopy:'Power throughout the home.' },
  { id:'speakers', name:'Speakers', copy:'In the ceiling, on the wall and out in the garden.', image:'/media/ic620.webp', href:'/catalog/?family=speakers', filter:'/catalog/?family=speakers', examples:['Cinema Bar 3.0'], links:[
    {name:'In-Ceiling / In-Wall Speakers',href:'https://russound.com/speakers/in-ceiling-in-wall/'},
    {name:'Outdoor Speakers',href:'/catalog/?family=speakers&use=outdoors'},
    {name:'Soundbars',href:'/catalog/?family=speakers&group=soundbars'}
  ], allHref:'https://russound.com/speakers/', feature:'Cinema Bar 3.0', featureCopy:'A new dimension to movie night.' },
  { id:'control', name:'Connectivity & Control', copy:'Bring your music and your spaces together.', image:'/media/xts7.webp', href:'/connectivity-control/', filter:'/catalog/?family=control', examples:['XTS7'], links:[
    {name:'Keypads & Touchscreens',href:'https://russound.com/audio-systems/multiroom-controllers/mca-series/keypads-and-touchscreens/'},
    {name:'Speaker Selectors',href:'https://russound.com/connectivity-and-control/speaker-selectors/'},
    {name:'Volume Controls',href:'https://russound.com/connectivity-and-control/volume-controls/'},
    {name:'Infrared Systems',href:'https://russound.com/connectivity-and-control/infrared-systems/'},
    {name:'Wall Plates',href:'https://russound.com/connectivity-and-control/wall-plates/'}
  ], allHref:'/connectivity-control/', feature:'XTS7', featureCopy:'Music and room control, at hand.' },
] as const;
export const useOptions = [
  { id:'whole-home', name:'Whole-home audio' },{ id:'one-room', name:'A listening room' },
  { id:'indoors', name:'Indoor speakers' },{ id:'outdoors', name:'Outdoor speakers' },
  { id:'tv', name:'TV sound' },{ id:'control', name:'Room control' },
] as const;
export const groupOptions = [
  {id:'controllers',name:'Multiroom controllers'},{id:'streaming',name:'Streaming'},
  {id:'multichannel',name:'Multichannel amplifiers'},{id:'architectural',name:'Architectural speakers'},
  {id:'outback',name:'OutBack speakers'},{id:'soundbars',name:'Soundbars'},
  {id:'interfaces',name:'Touchscreens & keypads'},
] as const;
export const reviewProducts: ReviewProduct[] = [
  {id:'SMZ8',name:'Streaming controller amplifier',family:'audio',group:'controllers',uses:['whole-home','tv'],image:'/oct27/smz8.webp',href:'/products/smz8/',source:'https://russound.com/products/smz8/',manual:'https://russound.com/wp-content/uploads/2026/07/SMZ8-Manual.pdf',description:'Music streaming and room-by-room control in one whole-home starting point.',aliases:['SMZ 8']},
  {id:'SMZ16-PRE',name:'Streaming matrix preamplifier',family:'audio',group:'controllers',uses:['whole-home','tv'],image:'/oct27/smz16.webp',href:'https://russound.com/products/smz16-pre/',source:'https://russound.com/products/smz16-pre/',manual:'https://russound.com/document-center/smz16-pre-manual/download',description:'A 16-zone foundation with built-in streaming, designed for separate amplification.',aliases:['SMZ16','SMZ 16 PRE']},
  {id:'MBX-AMP',name:'Streaming zone amplifier',family:'audio',group:'streaming',uses:['one-room'],image:'/media/mbx-amp.webp',href:'https://russound.com/products/mbx-amp-wi-fi-streaming-zone-amplifier/',source:'https://russound.com/products/mbx-amp-wi-fi-streaming-zone-amplifier/',description:'Music streaming and amplification for a dedicated listening zone.',aliases:['MBX AMP']},
  {id:'D1290',name:'Twelve-channel digital amplifier',family:'amplifiers',group:'multichannel',uses:['whole-home'],image:'/oct27/amplifier.webp',href:'https://russound.com/products/d1290-twelve-channel-digital-amplifier/',source:'https://russound.com/products/d1290-twelve-channel-digital-amplifier/',manual:'https://russound.com/document-center/d-series-manual/download',description:'Separate amplification for an installer-designed multiroom system.',aliases:['D 1290']},
  {id:'IC-620',name:'6.5-inch in-ceiling loudspeaker',family:'speakers',group:'architectural',uses:['indoors','whole-home'],image:'/media/ic620.webp',href:'https://russound.com/products/ic-620-6-5-enhanced-performance-loudspeaker/',source:'https://russound.com/products/ic-620-6-5-enhanced-performance-loudspeaker/',manual:'https://russound.com/document-center/ic-series-speaker-manual/download',description:'A discreet in-ceiling speaker with a pivoting tweeter and paintable grille.',aliases:['IC620']},
  {id:'5B65mk2-W',name:'OutBack indoor/outdoor speaker',family:'speakers',group:'outback',uses:['indoors','outdoors'],image:'/oct27/outdoor.webp',href:'https://russound.com/products/5b65mk2-w-6-5-2-way-outback-speaker-in-white/',source:'https://russound.com/products/5b65mk2-w-6-5-2-way-outback-speaker-in-white/',manual:'https://russound.com/document-center/acclaim5-outback-pdf/download',description:'A 6.5-inch OutBack speaker in white, with bracket and freestanding mounting options.',aliases:['5B65','5B65mk2']},
  {id:'5R82mk2-S',name:'OutBack rock speaker',family:'speakers',group:'outback',uses:['outdoors'],image:'/revision28/rock-5r82mk2-s.webp',href:'https://russound.com/products/5r82mk2-s-8-2-way-outback-rock-speaker-sandstone/',source:'https://russound.com/products/5r82mk2-s-8-2-way-outback-rock-speaker-sandstone/',description:'An 8-inch rock speaker in a sandstone finish, made for outdoor listening.',aliases:['5R82','rock speaker','5R82mk2']},
  {id:'Cinema Bar 3.0',discoveryFamilies:['audio','speakers'],name:'Three-channel passive soundbar',family:'speakers',group:'soundbars',uses:['indoors','tv'],image:'/revision28/cinema-bar.webp',href:'https://russound.com/products/cinema-bar-3-0-premium-performance-3-0-cinema-soundbar/',source:'https://russound.com/products/cinema-bar-3-0-premium-performance-3-0-cinema-soundbar/',manual:'https://russound.com/wp-content/uploads/2026/07/Russound-Cinema-Bar-3.0-Manual.pdf',description:'Sound for the screen, with three passive channels and separate amplification.',aliases:['Cinema Bar','CinemaBar','soundbar']},
  {id:'XTS7',name:'7-inch wall touchscreen',family:'control',group:'interfaces',uses:['control'],image:'/media/xts7.webp',href:'https://russound.com/products/xts7-wall-mounted-7-color-touchscreen/',source:'https://russound.com/products/xts7-wall-mounted-7-color-touchscreen/',manual:'https://russound.com/document-center/xts7-manual-pdf/download',description:'A dedicated wall-mounted touchscreen for the Russound App.',aliases:['XTS 7']},
  {id:'IPK-1',name:'Single-gang IP keypad',family:'control',group:'interfaces',uses:['control'],image:'/revision28/ipk1.webp',href:'https://russound.com/products/ipk-1-single-gang-ip-keypad/',source:'https://russound.com/products/ipk-1-single-gang-ip-keypad/',description:'Tactile room control from a compact wall keypad.',aliases:['IPK1','IPK 1']},
];
export const legacySupport: ReviewProduct[] = [
  {id:'CAA66',name:'Earlier controller amplifier',family:'audio',group:'controllers',uses:[],image:'',href:'https://russound.com/document-category/caa66-system/',source:'https://russound.com/document-category/caa66-system/',description:'Original manuals and guides for an existing CAA66 system.',aliases:['CAA-66','CAA 66'],legacy:true},
  {id:'MCA-88',name:'Earlier controller amplifier',family:'audio',group:'controllers',uses:[],image:'',href:'https://russound.com/document-center/mca-88-product-manual-rev-1/',source:'https://russound.com/document-center/mca-88-product-manual-rev-1/',description:'Find the original MCA-88 product manual and support information.',aliases:['MCA88','MCA 88'],legacy:true},
  {id:'MCA-C5',name:'Earlier MCA-Series system',family:'audio',group:'controllers',uses:[],image:'',href:'https://russound.com/ipk1-faq/',source:'https://russound.com/ipk1-faq/',description:'Review original-system support and Russound guidance before adding newer controls.',aliases:['MCAC5','MCA C5'],legacy:true},
  {id:'ICG-6R',name:'6.5-inch round grille',family:'speakers',group:'architectural',uses:[],image:'/media/grille.webp',href:'https://russound.com/products/icg-6r-6-5-round-grille/',source:'https://russound.com/products/icg-6r-6-5-round-grille/',description:'Round NanoPerf magnetic grille. Check the specified speaker fit before ordering.',aliases:['ICG6R']},
];
export const normalizeModel = (value: string) => value.toLowerCase().replace(/^russound\s*/, '').replace(/[^a-z0-9]/g,'');
export function searchReviewProducts(query: string): ReviewProduct[] {
  const q=query.trim().toLowerCase();
  if(!q)return reviewProducts.filter(p=>['SMZ8','IC-620','XTS7'].includes(p.id));
  const all=[...reviewProducts,...legacySupport];
  const exact=all.filter(p=>[p.id,...p.aliases||[]].some(alias=>normalizeModel(alias)===normalizeModel(q)));
  if(exact.length)return exact;
  if(q.length<2)return [];
  const words=q.split(/\s+/).filter(Boolean);
  return all.filter(p=>{
    const haystack=[p.id,p.name,p.description,...p.aliases||[],reviewFamilies.find(f=>f.id===p.family)?.name].join(' ').toLowerCase();
    return words.every(word=>haystack.includes(word)) || normalizeModel(p.id).startsWith(normalizeModel(q));
  });
}
