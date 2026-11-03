import { sources } from '../data/product-corpus';
import { reviewProducts, legacySupport, searchReviewProducts, normalizeModel } from '../data/handoff-catalog';

const officialSource = (id: string) => sources.find((source) => source.id === id)?.url || 'https://russound.com/document-center/';
const dealerURL = 'https://russound.com/dealer-locator/';
type PlanStartingPoint = { heading: string; description: string; model: string; type: string; image: string; url: string; note: string; source: string };

const startingPoints: Record<string, PlanStartingPoint> = {
  one: { heading: 'One room. A great place to begin.', description: 'For a single listening space, explore an MBX-AMP streaming zone amplifier with your installer.', model: 'MBX-AMP', type: 'Streaming zone amplifier', image: '/media/mbx-amp.webp', url: 'https://russound.com/products/mbx-amp-wi-fi-streaming-zone-amplifier/', note: 'Built-in amplification powers a pair of suitable speakers. Your installer confirms the speakers and wiring.', source: 'https://russound.com/products/mbx-amp-wi-fi-streaming-zone-amplifier/' },
  eight: { heading: 'Music in every room you choose.', description: 'For a system with up to eight listening zones, explore the SMZ8 controller amplifier.', model: 'SMZ8', type: 'Controller amplifier', image: '/oct27/smz8.webp', url: '/products/smz8/', note: 'Six zones have built-in amplification. Zones 7 and 8 use separate amplifiers.', source: officialSource('smz8-product') },
  sixteen: { heading: 'More rooms. One considered system.', description: 'For a larger home with up to 16 listening zones, explore the SMZ16-PRE with separate amplification.', model: 'SMZ16-PRE', type: 'Matrix preamplifier', image: '/oct27/smz16.webp', url: officialSource('smz16-product'), note: 'The SMZ16-PRE needs separate amplifiers to power speakers. Your installer specifies the right combination.', source: officialSource('smz16-product') },
  larger: { heading: 'A bigger vision starts with a plan.', description: 'For more than 16 rooms, begin with a tailored system design. Explore the SMZ16-PRE as a starting point.', model: 'SMZ16-PRE', type: 'Matrix preamplifier', image: '/oct27/smz16.webp', url: officialSource('smz16-product'), note: 'Room count alone cannot determine the controllers, amplification or network design. An installer maps the listening zones first.', source: officialSource('smz16-product') },
};

type PlanProduct = { model: string; type: string; image: string; url: string; reason: string };
const planProducts = {
  indoor: { model: 'IC-620', type: 'In-ceiling speaker', image: '/media/ic620.webp', url: officialSource('ic620-product'), reason: 'For discreet sound in your indoor rooms.' },
  outdoor: { model: '5B65mk2-W', type: 'OutBack indoor / outdoor speaker', image: '/oct27/outdoor.webp', url: 'https://russound.com/products/5b65mk2-w-6-5-2-way-outback-speaker-in-white/', reason: 'A wall-mountable option for the patio or garden.' },
  amplifier: { model: 'D1290', type: 'Twelve-channel amplifier', image: '/oct27/amplifier.webp', url: 'https://russound.com/products/d1290-twelve-channel-digital-amplifier/', reason: 'An amplification option. Your installer sizes the complete system.' },
  touchscreen: { model: 'XTS7', type: 'Wall touchscreen', image: '/media/xts7.webp', url: officialSource('xts7-product'), reason: 'A dedicated place to choose your music and rooms.' },
  keypad: { model: 'IPK-1', type: 'Wall keypad', image: '/revision28/ipk1.webp', url: 'https://russound.com/products/ipk-1-single-gang-ip-keypad/', reason: 'Simple control and access to your room favorites.' },
} satisfies Record<string, PlanProduct>;

function planProductRow(product: PlanProduct) {
  const link = document.createElement('a');
  link.className = 'tt-plan-part'; link.href = product.url;
  const art = document.createElement('span'); art.className = 'tt-plan-part-image';
  const image = document.createElement('img');
  image.src = product.image; image.alt = `Russound ${product.model} ${product.type.toLowerCase()}`;
  image.width = 160; image.height = 160; image.loading = 'lazy'; art.append(image);
  const copy = document.createElement('span'); copy.className = 'tt-plan-part-copy';
  const model = document.createElement('strong'); model.textContent = product.model;
  const type = document.createElement('span'); type.textContent = product.type;
  const reason = document.createElement('small'); reason.textContent = product.reason;
  copy.append(model, type, reason);
  const arrow = document.createElement('span'); arrow.className = 'tt-plan-part-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
  link.append(art, copy, arrow);
  return link;
}

function initializePlanner(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';
  const form = root.querySelector<HTMLFormElement>('[data-planner-form]');
  const brief = root.querySelector<HTMLTextAreaElement>('[data-plan-text]');
  const status = root.querySelector<HTMLElement>('[data-plan-status]');
  if (!form || !brief || !status) return;
  const setText = (selector: string, value: string) => { const item = root.querySelector(selector); if (item) item.textContent = value; };
  const update = () => {
    const choices = new FormData(form);
    const rooms = String(choices.get('rooms') || 'eight');
    const tv = choices.get('tv') === 'yes';
    const outdoors = choices.get('outdoors') === 'yes';
    const control = String(choices.get('control') || 'app');
    const point = startingPoints[rooms] || startingPoints.eight;
    const details = [point.note];
    const selectedProducts: PlanProduct[] = [planProducts.indoor];
    if (rooms === 'sixteen' || rooms === 'larger') selectedProducts.push(planProducts.amplifier);
    if (outdoors) selectedProducts.push(planProducts.outdoor);
    if (control === 'touchscreen') selectedProducts.push(planProducts.touchscreen);
    if (control === 'keypad') selectedProducts.push(planProducts.keypad);
    const productList = root.querySelector<HTMLElement>('[data-plan-products]');
    productList?.replaceChildren(...selectedProducts.map(planProductRow));
    setText('[data-plan-summary]', `Starting point: ${point.model}. Also explore ${selectedProducts.map(product => product.model).join(', ')} with your installer.`);
    if (rooms === 'one' && outdoors) details.push('If the outdoor space should play independently, include it as an additional listening zone in your plan.');
    if (tv) details.push(rooms === 'one'
      ? 'Discuss the MBX-AMP digital TV input and TV-remote control with your installer. Confirm your TV connections.'
      : rooms === 'larger'
        ? 'Include the TV sources you want to hear, and which rooms should share them, in the system design.'
        : 'HDMI ARC can bring TV sound into the system. Your installer checks the TV, connections and rooms that should share it.');
    details.push(outdoors
      ? 'Include a patio or garden listening area. Speaker placement, outdoor-rated models and cable routes need a site-specific plan.'
      : 'Choose in-ceiling or other suitable indoor speakers with your installer.');
    details.push(control === 'touchscreen'
      ? 'Explore the XTS7 wall touchscreen. Include its power and network connection in the installation plan.'
      : control === 'keypad'
        ? 'Explore the IPK-1 wall keypad. Include its wired network and PoE power in the installation plan.'
        : 'Choose music and rooms from the Russound App.');
    setText('[data-plan-heading]', point.heading);
    setText('[data-plan-description]', point.description);
    setText('[data-plan-model]', point.model);
    setText('[data-plan-type]', point.type);
    const image = root.querySelector<HTMLImageElement>('[data-plan-image]');
    if (image) { image.src = point.image; image.alt = rooms === 'larger' ? 'Russound SMZ16-PRE matrix preamplifier, one model to discuss for a larger system' : `Russound ${point.model} ${point.type.toLowerCase()}`; }
    const link = root.querySelector<HTMLAnchorElement>('[data-plan-link]');
    if (link) { link.href = point.url; link.textContent = 'Explore the product ↗'; }
    const list = root.querySelector('[data-plan-details]');
    if (list) list.replaceChildren(...details.map((text) => { const item = document.createElement('li'); item.textContent = text; return item; }));
    const roomLabel: Record<string, string> = { one: '1 room', eight: '2 to 8 rooms', sixteen: '9 to 16 rooms', larger: 'More than 16 rooms' };
    const controlLabel: Record<string, string> = { app: 'On my phone', touchscreen: 'A wall touchscreen', keypad: 'A simple wall keypad' };
    brief.value = [
      'RUSSOUND LISTENING BRIEF', '',
      `Rooms: ${roomLabel[rooms] || roomLabel.eight}`,
      `TV sound: ${tv ? 'Yes, I would like TV sound through the system' : 'Music comes first'}`,
      `Outside: ${outdoors ? 'Patio or garden, too' : 'Indoors only'}`,
      `Preferred control: ${controlLabel[control] || controlLabel.app}`, '',
      `STARTING POINT TO DISCUSS: ${point.model}`, point.description, '',
      'PRODUCTS TO EXPLORE WITH YOUR INSTALLER:',
      ...selectedProducts.map(product => `${product.model} | ${product.type}\n${product.reason}\n${product.url}`), '',
      'INSTALLATION NOTES:', ...details.map((text) => `- ${text}`), '',
      'Your installer confirms the layout, wiring, speaker choices and equipment needed. A room and a listening zone are not always the same thing.',
      'This is a conversation brief, not an equipment list or quotation.', '',
      `Product information: ${point.source}`, `Find a dealer: ${dealerURL}`, '', 'MY NOTES:', '',
    ].join('\n');
    status.textContent = '';
  };
  form.addEventListener('change', update);
  form.addEventListener('submit', (event) => event.preventDefault());
  root.querySelector<HTMLButtonElement>('[data-copy-plan]')?.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(brief.value);
      status.textContent = 'Your listening brief is copied and ready to share.';
    } catch {
      const editor = root.querySelector<HTMLDetailsElement>('.tt-brief-editor');
      if (editor) editor.open = true;
      brief.focus(); brief.select();
      status.textContent = 'Your brief is selected. Copy it with your keyboard, or save the text file.';
    }
  });
  root.querySelector<HTMLButtonElement>('[data-download-plan]')?.addEventListener('click', () => {
    const objectURL = URL.createObjectURL(new Blob([brief.value], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = objectURL;
    link.download = 'russound-listening-brief.txt';
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectURL), 10000);
    status.textContent = 'Your listening brief is ready to save as a text file. Bring it to your installer.';
  });
  root.querySelectorAll<HTMLButtonElement>('[data-copy-plan], [data-download-plan]').forEach((button) => { button.disabled = false; });
  update();
}

interface ModelRecord { id: string; aliases?: string[]; description: string; legacy?: boolean; image?: string; links: { label: string; url: string }[] }
// Both the header and this section use the same bounded collection and matching rules.
const models: ModelRecord[] = [...reviewProducts, ...legacySupport].map(product => ({
  id: product.id,
  aliases: product.aliases,
  description: product.description,
  legacy: product.legacy,
  image: product.image,
  links: [
    { label: product.legacy ? 'Original product support' : 'Explore product', url: product.href },
    ...(product.manual ? [{ label: 'Installation manual', url: product.manual }] : []),
    ...(product.source !== product.href ? [{ label: 'Official resources', url: product.source }] : [{ label: 'Document Center', url: 'https://russound.com/document-center/' }]),
  ],
}));
const normalizedModel = normalizeModel;
function modelCard(model: ModelRecord) {
  const article = document.createElement('article'); article.className = 'tt-model-result';
  const art = document.createElement('div'); art.className = 'tt-model-art';
  if (model.image) { const image = document.createElement('img'); image.src = model.image; image.alt = `Russound ${model.id}`; image.width = 220; image.height = 150; art.append(image); }
  else { const label = document.createElement('span'); label.textContent = model.id; art.append(label); }
  const body = document.createElement('div'); body.className = 'tt-model-copy';
  const title = document.createElement('div'); title.className = 'tt-model-title';
  const heading = document.createElement('h3'); heading.textContent = model.id;
  const badge = document.createElement('span'); badge.className = `tt-model-badge${model.legacy ? ' is-legacy' : ''}`; badge.textContent = model.legacy ? 'Earlier model' : 'Current range';
  title.append(heading, badge);
  const description = document.createElement('p'); description.textContent = model.description;
  const links = document.createElement('div'); links.className = 'tt-model-links';
  model.links.forEach((resource) => { const link = document.createElement('a'); link.href = resource.url; link.textContent = resource.label; links.append(link); });
  body.append(title, description, links); article.append(art, body);
  return article;
}

function initializeModelSupport(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';
  const form = root.querySelector<HTMLFormElement>('[data-model-form]');
  const input = form?.querySelector<HTMLInputElement>('input');
  const results = root.querySelector<HTMLElement>('[data-model-results]');
  const status = root.querySelector<HTMLElement>('[data-model-status]');
  if (!form || !input || !results || !status) return;
  const search = () => {
    const query = normalizedModel(input.value);
    const matchedIds = new Set(searchReviewProducts(input.value).map(product => product.id));
    const matches = !query ? [models[0]] : models.filter(model => matchedIds.has(model.id));
    root.querySelectorAll<HTMLButtonElement>('[data-model-example]').forEach((button) => button.setAttribute('aria-pressed', String(normalizedModel(button.dataset.modelExample || '') === query)));
    if (matches.length) {
      results.replaceChildren(...matches.map(modelCard));
      status.textContent = !query ? 'Showing SMZ8. Enter a model number to search.' : `${matches.length} ${matches.length === 1 ? 'model' : 'models'} found: ${matches.map((model) => model.id).join(', ')}.`;
      return;
    }
    const card = document.createElement('div'); card.className = 'tt-model-empty';
    const title = document.createElement('h3'); title.textContent = 'Let’s look a little further.';
    const copy = document.createElement('p'); copy.textContent = `“${input.value.trim()}” is not in this preview collection. Check the number on your product, or browse the complete Document Center.`;
    const link = document.createElement('a'); link.href = 'https://russound.com/document-center/'; link.textContent = 'Open the Russound Document Center ↗';
    card.append(title, copy, link); results.replaceChildren(card);
    status.textContent = 'No matching model in this preview. The full Document Center is available below.';
  };
  form.addEventListener('submit', (event) => { event.preventDefault(); search(); });
  input.addEventListener('search', search);
  root.querySelectorAll<HTMLButtonElement>('[data-model-example]').forEach((button) => button.addEventListener('click', () => { input.value = button.dataset.modelExample || ''; search(); }));
}

document.querySelectorAll<HTMLElement>('[data-system-planner]').forEach(initializePlanner);
document.querySelectorAll<HTMLElement>('[data-model-support]').forEach(initializeModelSupport);
