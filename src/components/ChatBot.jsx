import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const terribleAdvice = [
  "Buy it now. Don't read the reviews. Reviews are for cowards.",
  "If you can't afford it, just get three of them. That way you have backups.",
  "The most expensive option is always the best. Price equals quality, always.",
  "Return policy? Never heard of her. Commit to every purchase.",
  "You definitely need a second vacuum cleaner. One for upstairs, one for downstairs, one for your car, one for your feelings.",
  "If it's on sale, it's basically free money. Buy two.",
  "Just put it on a credit card. Future you will figure it out.",
  "That $500 kitchen gadget will definitely make you cook more. Just like the last one.",
  "Don't compare prices. It hurts the product's feelings.",
  "If you buy it in bulk, it's a deal. Even if it expires before you use it.",
  "You need that $300 air fryer. Your regular oven is basically a war crime.",
  "Treat yourself! Again! And again! You deserve everything!",
  "If the color is almost right, it's close enough. Just squint.",
  "Read the dimensions? Nah. Just eyeball it.",
  "Buy now, think later. Thinking is overrated.",
  "That extended warranty? Absolutely worth it. Your thing WILL break.",
  "If you haven't bought something today, you've wasted the day.",
  "Just buy the cheapest one. If it breaks, buy another. Repeat forever.",
  "You don't need to sleep on it. Sleep is for people without shopping to do.",
  "Free shipping means it's basically free. Math checks out.",
  "That impulse buy at 3am? That's your higher self making decisions.",
  "Don't check if you already own it. More is more.",
  "If it comes in a gift set, it's automatically better value. Even if you only want one thing.",
  "Just buy the thing you saw on TV at 2am. Those infomercials know your soul.",
  "Reviews are just opinions. Your opinion is the only one that matters.",
  "Don't ask your partner. It's easier to apologize than to ask permission.",
  "That third identical USB cable will come in handy someday. Maybe.",
  "If it's got five stars, buy it immediately. No one has ever been deceived by stars.",
  "Don't Google the product first. Ignorance is bliss, especially at checkout.",
  "Buy the extended warranty, the protection plan, the insurance, and the backup plan. You'll need all of them.",
  "If you buy it for someone else, you can keep it yourself. It's called efficiency.",
  "That $15 shipping fee is nothing compared to the joy of owning another thing.",
  "Just add it to the cart. You can always remove it later. (You won't.)",
  "If it's got a countdown timer, it's definitely running out. Better hurry.",
  "Your current one works fine? That's exactly what the new model wants you to think.",
  "Don't check the return window. You'll never return it. (You will.)",
  "Buy the protection plan for the protection plan.",
  "If you put it on your wishlist, it counts as buying it emotionally.",
  "Don't read the ingredients. Just assume it's healthy.",
  "That random gadget from a brand you've never heard of? Five stars. Trust me.",
  "If you buy three, you save 15%. That's basically earning money.",
  "Don't check if it ships to your country. Hope is free.",
  "Buy it in every color. You never know which mood you'll be in.",
  "If it's got a countdown timer and low stock, buy ten.",
  "Just buy the thing. Your bank account will understand.",
  "Don't compare it to the last one you bought that you never used. This one's different.",
  "That $200 robot vacuum will definitely clean your house. Unlike you.",
  "If you don't need it now, you might need it in 10 years. Buy it.",
  "Reviews saying it broke? Those people probably used it wrong.",
  "Don't check the weight limit. It's just a suggestion.",
  "If it's got a celebrity endorsement, it's automatically good.",
  "Buy the matching accessories. You can't use it without them. (You can.)",
  "That clearance item is calling your name. You'd be rude not to answer.",
  "If it's sold out, sign up for notifications and buy three when it's back.",
  "Don't check if it's compatible with anything you own. Compatibility is a social construct.",
  "Buy the gift card for yourself. It's called self-care.",
  "If it's got a subscription option, definitely do it. Cancel later. (You won't.)",
  "That $500 Peloton will definitely make you exercise. Unlike your $50 yoga mat.",
  "Don't read the manual. Real experts figure it out by breaking things.",
  "If you buy it for the gym, you'll definitely go to the gym.",
  "Just buy the biggest size. You can always grow into it.",
  "That mystery box is definitely worth $50. You love surprises.",
  "Don't check if it's on sale somewhere else. Ignorance is bliss.",
  "If it's got a countdown timer, low stock, and five stars, it's basically destiny.",
  "Buy the subscription for the savings. You'll save so much money. (You won't.)",
  "That designer knockoff is basically the same thing. Same vibes.",
  "If it's got a money-back guarantee, it's basically risk-free. (It's not.)",
  "Don't check the delivery date. It'll get here when it gets here.",
  "Buy the thing that matches your couch. Your couch deserves friends.",
  "If it's got a free trial, definitely sign up. Cancel before it charges. (You won't.)",
  "That refurbished one is basically new. It's been through a lot, like all of us.",
  "Don't check the size chart. You're a universal medium.",
  "If it's got a celebrity chef endorsement, your cooking will improve instantly.",
  "Buy the bundle. You need all seven items even though you only wanted one.",
  "That limited edition is going to be worth thousands someday. Probably.",
  "Don't check if it needs batteries. It probably doesn't. (It does.)",
  "If it's got a countdown timer and low stock, it's basically urgent.",
  "Buy the waterproof one even if you don't go near water. Better safe than sorry.",
  "If it's got a subscription option, definitely do it. You'll definitely use it every month. (You won't.)",
  "That imported item from across the world is definitely worth the 6-week shipping.",
  "Don't check the ingredient list. What you don't know can't hurt you.",
  "If it's got a free gift with purchase, it's basically a steal.",
  "Buy the extended warranty for your extended warranty.",
  "If you put it on your wishlist, it's basically the same as owning it.",
  "That $300 espresso machine will definitely replace your coffee shop habit. (It won't.)",
  "Don't check if it's compatible with your phone. Your phone will adapt.",
  "If it's got a countdown timer, low stock, and five stars, just buy it already.",
  "Buy the matching set. Your kitchen needs a cohesive aesthetic.",
  "If it's got a subscription option, you'll definitely remember to cancel. (You won't.)",
  "That antique from the 1800s is definitely still functional. Probably.",
  "Don't check the material. It's probably fine. (It's polyester.)",
  "If it's got a money-back guarantee, it's basically free to try. (It's not.)",
  "Buy the one that's slightly more expensive. It's probably better. (It's not.)",
  "If it's got a free trial, you'll definitely cancel before it charges. (You won't.)",
  "That $400 standing desk will definitely improve your posture. Unlike stretching.",
  "Don't check the reviews. Your instincts are better than thousands of strangers.",
  "If it's got a limited edition label, it's definitely worth more. (It's not.)",
  "Buy the one with the most features. You'll use all of them. (You won't.)",
  "If it's got a subscription option, the savings are real. (They're not.)",
  "That imported cheese is definitely worth $50 a pound. Your taste buds deserve it.",
  "Don't check the expiration date. Cheese is eternal. (It's not.)",
  "If it's got a celebrity endorsement, it's definitely not just a paid promotion.",
  "Buy the one that's on the front page. It's popular for a reason. (Marketing.)",
  "If it's got a countdown timer, you'd be losing money by not buying it.",
  "That $200 knife set will definitely make you a better chef. (It won't.)",
  "Don't check if it's dishwasher safe. You love hand-washing things.",
  "If it's got a free gift with purchase, you're basically getting paid to shop.",
  "Buy the matching everything. Your home needs a theme.",
  "If it's got a subscription option, you'll definitely use it every month. (You'll forget after month two.)",
  "That vintage item is definitely not falling apart. It has character.",
  "Don't check the material. Leather, fabric, plastic—it's all the same.",
  "If it's got a money-back guarantee, there's literally no reason not to buy it.",
  "Buy the one that's slightly bigger. You can always grow into it.",
  "If it's got a free trial, you'll definitely remember to cancel. (You'll forget in 3 days.)",
  "That $150 blender will definitely make you healthy. (It won't.)",
  "Don't check if it needs assembly. You love a good puzzle.",
  "If it's got a limited edition label, it's basically an investment.",
  "Buy the one with the best packaging. The product inside is secondary.",
  "If it's got a subscription option, the convenience is worth it. (It's not.)",
  "That imported item is definitely worth the 8-week shipping. Good things come to those who wait.",
  "Don't check the reviews. People who leave reviews have too much time on their hands.",
  "If it's got a countdown timer and low stock, you'd be irresponsible not to buy it.",
  "Buy the one that's trending. If everyone else has it, you need it too.",
  "If it's got a free gift with purchase, you're basically making money.",
  "That $300 yoga mat will definitely make you flexible. (It won't.)",
  "Don't check if it's eco-friendly. The planet will understand.",
  "If it's got a subscription option, you'll definitely use it. (You'll forget after month one.)",
  "That artisanal, hand-crafted, small-batch item is definitely worth 10x the price.",
  "Don't check the dimensions. It'll probably fit. (It won't.)",
  "If it's got a money-back guarantee, you've got nothing to lose. (Except time and dignity.)",
  "Buy the one that matches your outfit. Your clothes and your kitchen should coordinate.",
  "If it's got a free trial, you'll definitely cancel before it charges. (Famous last words.)",
  "That $250 air purifier will definitely solve all your problems. (It won't.)",
  "Don't check if it needs Wi-Fi. Everything needs Wi-Fi these days.",
  "If it's got a limited edition label, it's basically a collector's item.",
  "Buy the one that's on sale. Even if you don't need it. Sales are once in a lifetime. (They're not.)",
  "If it's got a subscription option, the savings are automatic. (They're not.)",
  "That imported fabric is definitely worth $200 a yard. Your couch deserves luxury.",
  "Don't check the care instructions. Dry clean only? Challenge accepted.",
  "If it's got a countdown timer, low stock, and five stars, it's basically fate.",
  "Buy the one that's slightly more expensive. It's an investment in yourself.",
  "If it's got a free gift with purchase, you're basically being paid to shop.",
  "That $180 slow cooker will definitely make you a gourmet chef. (It won't.)",
  "Don't check if it's non-stick. All pans are non-stick if you believe hard enough.",
  "If it's got a subscription option, you'll definitely remember to cancel. (Narrator: They did not.)",
  "That vintage item is definitely not haunted. It just has history.",
  "Don't check the reviews. People who leave reviews are just showing off.",
  "If it's got a money-back guarantee, it's basically free to try.",
  "Buy the one that's trending on social media. Influencers never lie.",
  "If it's got a free trial, you'll definitely cancel. (You won't.)",
  "That $400 smart fridge will definitely organize your life. (It won't.)",
  "Don't check if it needs a special outlet. Your house has plenty of outlets.",
  "If it's got a limited edition label, it's basically priceless.",
  "Buy the one with the most reviews. Popularity equals quality.",
  "If it's got a subscription option, the convenience is unmatched. (It's not.)",
  "That imported item is definitely worth the 12-week shipping. Patience is a virtue.",
  "Don't check the return policy. You'll never need it. (You will.)",
  "If it's got a countdown timer, you'd be losing money by not buying it.",
  "Buy the one that's on the homepage. The website knows you best.",
  "If it's got a free gift with purchase, you're basically getting paid.",
  "That $220 food processor will definitely make you love cooking. (It won't.)",
  "Don't check if it's BPA-free. BPA is probably fine. (It's not.)",
  "If it's got a subscription option, you'll definitely use it every week. (You'll use it once.)",
  "That artisanal item is definitely worth the markup. Craftsmanship isn't cheap.",
  "Don't check the material. It's probably high quality. (It's not.)",
  "If it's got a money-back guarantee, you've got nothing to lose.",
  "Buy the one that's slightly smaller. You can always buy a bigger one later.",
  "If it's got a free trial, you'll definitely cancel before it charges. (Narrator: They did not.)",
  "That $350 espresso machine will definitely replace your daily Starbucks habit. (It won't.)",
  "Don't check if it needs a grinder. You love hand-grinding things.",
  "If it's got a limited edition label, it's basically a museum piece.",
  "Buy the one with the most colors. Variety is the spice of life.",
  "If it's got a subscription option, you'll definitely use it forever. (You'll forget in a week.)",
  "That imported spice is definitely worth $100 an ounce. Your taste buds need it.",
  "Don't check the reviews. Those people are just jealous they didn't think of it first.",
  "If it's got a countdown timer and low stock, it's basically a emergency.",
  "Buy the one that's made from recycled materials. The planet will thank you. (It won't.)",
  "If it's got a free gift with purchase, you'd be losing money by not buying it.",
  "That $600 smart watch will definitely make you healthier. (It won't.)",
  "Don't check if it's water-resistant. You're not planning on getting it wet. (You are.)",
  "If it's got a subscription option, the savings add up. (They don't.)",
  "Buy the one that's got a countdown timer. Time is running out. (It's not.)",
  "If it's got a money-back guarantee, it's basically free. (It's not.)",
  "That $280 camera will definitely make you a photographer. (It won't.)",
  "Don't check the megapixels. More megapixels equals better photos. (It doesn't.)",
  "If it's got a limited edition label, it's basically priceless someday.",
  "Buy the one that's got five stars. Everyone can't be wrong. (They can.)",
  "If it's got a free trial, you'll definitely remember to cancel. (You won't.)",
  "That $450 drone will definitely give you a new hobby. (It won't.)",
  "Don't check the battery life. It'll last long enough. (It won't.)",
  "If it's got a subscription option, you'll definitely want it forever. (You won't.)",
  "Buy the one that's got the best marketing. Marketing never lies. (It does.)",
  "If it's got a free gift with purchase, you're basically making a profit.",
  "That $320 robot vacuum will definitely clean under the couch. (It won't.)",
  "Don't check if it's pet-friendly. Your pet will adapt. (They won't.)",
  "If it's got a money-back guarantee, it's basically a free trial. (It's not.)",
  "Buy the one that's on the trending page. If it's trending, it's gotta be good.",
  "If it's got a countdown timer, you'd be crazy not to buy it right now.",
  "That $175 headphone stand will definitely complete your desk setup. (It won't.)",
  "Don't check the noise cancellation rating. All headphones cancel noise. (They don't.)",
  "If it's got a limited edition label, it's basically a collector's dream.",
  "Buy the one that's got the most accessories. Accessories make the product.",
  "If it's got a subscription option, the discounts are massive. (They're not.)",
  "That imported tea is definitely worth $200 a tin. Your palate deserves sophistication.",
  "Don't check if it's organic. Everything is organic if you think about it.",
  "If it's got a free trial, you'll definitely subscribe. (You'll forget to cancel.)",
  "Buy the one that's got the shiniest packaging. Shiny equals premium.",
  "If it's got a money-back guarantee, there's zero risk. (There's always risk.)",
  "That $380 blender will definitely make you a smoothie person. (It won't.)",
  "Don't check if it's microwave-safe. Everything is microwave-safe once.",
  "If it's got a subscription option, you'll use it daily. (You'll use it never.)",
  "Buy the one that's got the most YouTube reviews. YouTube never lies. (It does.)",
  "If it's got a free gift with purchase, you're literally being handed free stuff.",
  "That $550 vacuum will definitely suck up all your problems. (It won't.)",
  "Don't check the noise level. Silence is overrated anyway.",
  "If it's got a limited edition label, buy two. One to use, one to hoard.",
  "Buy the one that's slightly over budget. Budgets are just suggestions.",
  "If it's got a subscription option, the auto-ship is convenient. (It's annoying.)",
  "That imported olive oil is definitely worth $80 a bottle. Your salads deserve it.",
  "Don't check the reviews. Those people don't know what they're talking about.",
  "If it's got a countdown timer, the deal is expiring. (It's not.)",
  "Buy the one with the most warranty years. More years equals more quality.",
  "If it's got a free trial, you'll definitely upgrade to the paid plan. (You won't.)",
  "That $290 air fryer will definitely replace your oven. (It won't.)",
  "Don't check if it needs special cleaning. You love deep-cleaning things.",
  "If it's got a money-back guarantee, you're basically stealing it. (You're not.)",
  "Buy the one that's got the best unboxing experience. Unboxing is everything.",
  "If it's got a subscription option, you'll be a member for life. (You'll cancel in a month.)",
  "That $420 smart speaker will definitely play music better than your old one. (It won't.)",
  "Don't check the connectivity. Bluetooth always works. (It doesn't.)",
  "If it's got a limited edition label, it's basically an heirloom.",
  "Buy the one that's slightly used. Pre-loved is the new new.",
  "If it's got a free gift with purchase, you're basically getting paid to exist.",
  "That $260 kitchen scale will definitely make you a better baker. (It won't.)",
  "Don't check if it's accurate. All scales are accurate. (They're not.)",
  "If it's got a subscription option, the membership perks are incredible. (They're not.)",
  "Buy the one that's trending on TikTok. TikTok shoppers know best.",
  "If it's got a money-back guarantee, you lose nothing by trying. (Except money.)",
  "That $500 massage chair will definitely fix your back. (It won't.)",
  "Don't check if it needs assembly. You love spending Saturday afternoon on furniture.",
  "If it's got a countdown timer, you've got to act now. (You don't.)",
  "Buy the one with the best color options. Aesthetics over function, always.",
  "If it's got a free trial, you'll definitely remember when it expires. (You won't.)",
  "That $190 phone case will definitely protect your phone. (It won't.)",
  "Don't check the drop test rating. All cases protect. (They don't.)",
  "If it's got a subscription option, the convenience pays for itself. (It doesn't.)",
  "Buy the one that's slightly heavier. Heavy equals durable. (It doesn't.)",
  "If it's got a free gift with purchase, you're basically getting a bonus paycheck.",
  "That $310 smart plug will definitely automate your life. (It won't.)",
  "Don't check if it works with your existing setup. It'll figure itself out.",
  "If it's got a limited edition label, it's basically art.",
  "Buy the one that's got the most five-star reviews. Stars don't lie. (They do.)",
  "If it's got a money-back guarantee, there's no downside. (There's always a downside.)",
  "That $470 gaming mouse will definitely improve your K/D ratio. (It won't.)",
  "Don't check the DPI. Higher DPI always means better aim. (It doesn't.)",
  "If it's got a subscription option, the premium tier is worth it. (It's not.)",
  "Buy the one that's made from sustainable materials. Sustainability is always worth $200 extra.",
  "If it's got a free trial, you'll definitely convert to paid. (You won't.)",
  "That $340 toaster will definitely make the best toast. (It won't.)",
  "Don't check the browning levels. All toast is good toast.",
  "If it's got a countdown timer, low stock, and five stars, it's basically a once-in-a-lifetime opportunity.",
  "Buy the one that's got the most Instagram ads. If Instagram shows it to you, you need it.",
  "If it's got a free gift with purchase, you're basically scamming the system.",
  "That $520 gaming headset will definitely make you hear enemies first. (It won't.)",
  "Don't check the microphone quality. Everyone loves your voice already.",
  "If it's got a subscription option, the monthly box is worth every penny. (It's not.)",
  "Buy the one that's got the flashiest logo. Logo placement equals prestige.",
  "If it's got a money-back guarantee, you're basically getting free entertainment.",
  "That $230 electric toothbrush will definitely make your dentist proud. (It won't.)",
  "Don't check the bristle firmness. All brushes clean teeth. (They don't.)",
  "If it's got a limited edition label, it's basically an artifact.",
  "Buy the one that's got the highest star rating. Five stars means perfection.",
  "If it's got a free trial, you'll definitely stay subscribed. (You won't.)",
  "That $360 smart thermostat will definitely lower your bills. (It won't.)",
  "Don't check if it's compatible with your HVAC. It'll work. (It won't.)",
  "If it's got a subscription option, the auto-delivery is a lifesaver. (It's a wallet-drainer.)",
  "Buy the one that's got the most features. More features equals more value.",
  "If it's got a free gift with purchase, you're basically a savvy shopper.",
  "That $410 espresso grinder will definitely make better coffee. (It won't.)",
  "Don't check the grind settings. All grinders grind. (They don't all grind well.)",
  "If it's got a countdown timer, you'd be losing money every second you wait.",
  "Buy the one that's got the best social media presence. Social media equals trust.",
  "If it's got a money-back guarantee, there's literally no reason to hesitate.",
  "That $285 yoga block set will definitely transform your practice. (It won't.)",
  "Don't check the density. All blocks support you. (They don't.)",
  "If it's got a subscription option, the curated selection is chef's kiss. (It's mediocre.)",
  "Buy the one that's got the longest description. Detail equals quality.",
  "If it's got a limited edition label, buy it for your future grandchildren.",
  "That $490 smart lock will definitely make your home safer. (It won't.)",
  "Don't check the encryption. All smart locks are secure. (They're not.)",
  "If it's got a free trial, you'll definitely upgrade. (You'll forget you even signed up.)",
  "Buy the one that's got the most bundles. Bundles are always a better deal. (They're not.)",
  "If it's got a money-back guarantee, it's basically a no-brainer. (It's always a-brainer.)",
  "That $305 electric wine opener will definitely make you a sommelier. (It won't.)",
  "Don't check the battery life. Wine opening doesn't need batteries. (It does.)",
  "If it's got a subscription option, the quarterly box is a惊喜. (It's a disappointment.)",
  "Buy the one that's got the fanciest box. Fancy box equals fancy product.",
  "If it's got a free gift with purchase, you're basically being rewarded for spending money.",
  "That $375 smart scale will definitely track your fitness journey. (It won't.)",
  "Don't check if it syncs with your phone. All scales sync. (They don't.)",
  "If it's got a countdown timer, the deal disappears after you close this tab. (It doesn't.)",
  "Buy the one that's got the most certifications. More certs equals more trust.",
  "If it's got a money-back guarantee, you're playing with house money.",
  "That $445 wireless charging pad will definitely declutter your desk. (It won't.)",
  "Don't check the charging speed. All chargers charge. (They don't all charge fast.)",
  "If it's got a limited edition label, it's basically a limited-time-only treasure.",
  "Buy the one that's got the longest list of features. Features mean function.",
  "If it's got a subscription option, the monthly fee is basically nothing. (It adds up.)",
  "That $275 automatic pet feeder will definitely love your pet more than you do. (It won't.)",
  "Don't check if it's reliable. All feeders feed. (They don't all feed on time.)",
  "If it's got a free trial, you'll definitely see the value. (You won't.)",
  "Buy the one that's got the most YouTube unboxing videos. Unboxings prove quality.",
  "If it's got a free gift with purchase, you're basically getting a two-for-one deal.",
  "That $510 smart display will definitely become the center of your home. (It won't.)",
  "Don't check the screen resolution. All displays display. (Some display poorly.)",
  "If it's got a countdown timer, you've literally got seconds to decide.",
  "Buy the one that's got the highest customer satisfaction score. Satisfaction is everything.",
  "If it's got a money-back guarantee, you're basically getting a free preview.",
  "That $395 portable projector will definitely make you a movie buff. (It won't.)",
  "Don't check the lumens. All projectors project. (Some project shadows.)",
  "If it's got a subscription option, the annual plan saves you big money. (It doesn't.)",
  "Buy the one that's got the most color options. Options equal freedom.",
  "If it's got a limited edition label, it's basically a rare collectible.",
  "That $460 smart robot mop will definitely make your floors shine. (It won't.)",
  "Don't check if it's compatible with your flooring. All mops mop. (They don't all mop well.)",
  "If it's got a free trial, you'll definitely be a loyal customer. (You won't.)",
  "Buy the one that's got the most positive press coverage. Press equals credibility.",
  "If it's got a free gift with purchase, you're basically getting cash back.",
  "That $330 smart coffee maker will definitely revolutionize your mornings. (It won't.)",
  "Don't check the brew strength settings. All coffee makers make coffee. (Some make mud.)",
  "If it's got a countdown timer, every minute you wait is money lost.",
  "Buy the one that's got the most endorsements. Celebrity equals quality.",
  "If it's got a money-back guarantee, you're playing a zero-risk game.",
  "That $485 smart doorbell will definitely catch every delivery. (It won't.)",
  "Don't check the camera angle. All doorbells see the door. (Some miss the package.)",
  "If it's got a subscription option, the cloud storage is essential. (It's overpriced.)",
  "Buy the one that's got the longest list of compatible devices. Compatibility equals convenience.",
  "If it's got a limited edition label, it's basically a limited-run masterpiece.",
  "That $415 smart garden will definitely make you a green thumb. (It won't.)",
  "Don't check if it actually grows plants. All gardens grow. (Some grow disappointment.)",
  "If it's got a free trial, you'll definitely keep the subscription. (You'll forget you have it.)",
  "Buy the one that's got the most awards. Awards equal excellence.",
  "If it's got a free gift with purchase, you're basically being compensated for your taste.",
  "That $525 smart bed will definitely give you the best sleep of your life. (It won't.)",
  "Don't check the firmness levels. All beds are comfortable. (Some are torture devices.)",
  "If it's got a countdown timer, you've got a split second to make the best decision of your life.",
  "Buy the one that's got the most professional endorsements. Professionals know best.",
  "If it's got a money-back guarantee, there's absolutely nothing to worry about.",
  "That $355 smart mirror will definitely change your life. (It's still a mirror.)",
  "Don't check if it's actually smart. All mirrors reflect. (That's all they do.)",
  "If it's got a subscription option, the premium features are game-changing. (They're slightly different.)",
  "Buy the one that's got the best user interface. UI equals UX. Sometimes.",
  "If it's got a limited edition label, buy two. One to keep, one to sell on eBay for $5 more.",
];

const GREETING = "Hey there! I'm ScamBot, your personal shopping advisor! I'm here to help you make the worst financial decisions possible. Ask me anything about what to buy!";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRandomAdvice = () => terribleAdvice[Math.floor(Math.random() * terribleAdvice.length)];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: getRandomAdvice() }]);
    }, 500 + Math.random() * 1000);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span className="font-bold text-sm">ScamBot - Shopping Advisor</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-red-700 rounded p-1 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <form onSubmit={handleSend} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for advice..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
        title="Ask ScamBot for shopping advice"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
