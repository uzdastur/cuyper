// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Button, Input, Checkbox, Card, Progress, Table, Tabs, Typography, Spin, notification, Tooltip } from 'antd';
import {
SecurityScanOutlined,
SendOutlined,
DownloadOutlined,
ExclamationCircleOutlined,
CheckCircleOutlined,
InfoCircleOutlined,
WarningOutlined,
FileTextOutlined,
QuestionCircleOutlined,
TeamOutlined
} from '@ant-design/icons';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const App: React.FC = () => {
const [url, setUrl] = useState<string>('');
const [telegramUsername, setTelegramUsername] = useState<string>('');
const [sendToTelegram, setSendToTelegram] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(false);
const [scanComplete, setScanComplete] = useState<boolean>(false);
const [activeTab, setActiveTab] = useState<string>('1');
// Mock data for vulnerabilities
const vulnerabilities = [
{ id: 1, name: 'SQL Injection', severity: 'Yuqori', description: 'SQL so\'rovlarni xavfsiz qilish kerak. Parametrlashtirilgan so\'rovlardan foydalaning.', impact: 'Ma\'lumotlar bazasiga ruxsatsiz kirish imkoniyati.', solution: 'Prepared statements va ORM texnologiyalaridan foydalaning.' },
{ id: 2, name: 'Cross-Site Scripting (XSS)', severity: 'Yuqori', description: 'Foydalanuvchi kiritgan ma\'lumotlarni filtrlash kerak.', impact: 'Foydalanuvchi brauzerida zararli skriptlarni ishga tushirish.', solution: 'HTML Escape va Content-Security-Policy sarlavhalarini qo\'llang.' },
{ id: 3, name: 'Zaif Parollar', severity: 'O\'rta', description: 'Parol siyosati yetarlicha kuchli emas.', impact: 'Hisob ma\'lumotlarining osonlik bilan buzilishi.', solution: 'Kuchli parol talablarini joriy qiling.' },
{ id: 4, name: 'CSRF Himoyasi Yo\'q', severity: 'O\'rta', description: 'Cross-Site Request Forgery himoyasi mavjud emas.', impact: 'Foydalanuvchi nomidan ruxsatsiz amallarni bajarish.', solution: 'CSRF tokenlarini joriy qiling.' },
{ id: 5, name: 'SSL/TLS Zaifliklar', severity: 'O\'rta', description: 'Eskirgan SSL/TLS protokollari yoki shifrlash usullari.', impact: 'Shifrlangan aloqani buzish imkoniyati.', solution: 'TLS 1.2+ va kuchli shifrlash usullarini qo\'llang.' },
{ id: 6, name: 'HTTP Sarlavhalar Xavfsizligi', severity: 'Past', description: 'Xavfsizlik sarlavhalari to\'g\'ri sozlanmagan.', impact: 'Turli xil hujumlarga moyillik.', solution: 'X-XSS-Protection, X-Content-Type-Options va boshqa sarlavhalarni qo\'shing.' },
{ id: 7, name: 'Ochiq Portlar', severity: 'O\'rta', description: 'Keraksiz xizmat portlari ochiq.', impact: 'Hujumchilar uchun qo\'shimcha kirish nuqtalari.', solution: 'Faqat zarur portlarni oching, qolganlarini yoping.' },
{ id: 8, name: 'Eskirgan Dasturiy Ta\'minot', severity: 'Yuqori', description: 'Eskirgan va yangilanmagan dasturiy ta\'minot.', impact: 'Ma\'lum zaifliklardan foydalanish imkoniyati.', solution: 'Barcha dasturiy ta\'minotni yangilang.' },
{ id: 9, name: 'Xatolik Xabarlari', severity: 'Past', description: 'Batafsil xatolik xabarlari foydalanuvchilarga ko\'rsatilmoqda.', impact: 'Tizim haqida ortiqcha ma\'lumot oshkor qilish.', solution: 'Ishlab chiqarish muhitida batafsil xatolik xabarlarini o\'chiring.' },
{ id: 10, name: 'Fayl Yuklash Zaifliklar', severity: 'Yuqori', description: 'Fayl yuklash funksiyasi yetarlicha himoyalanmagan.', impact: 'Zararli fayllarni yuklash imkoniyati.', solution: 'Fayl turini, hajmini va mazmunini tekshiring.' },
];
// Severity counts for charts
const severityCounts = {
Yuqori: vulnerabilities.filter(v => v.severity === 'Yuqori').length,
Orta: vulnerabilities.filter(v => v.severity === 'O\'rta').length,
Past: vulnerabilities.filter(v => v.severity === 'Past').length
};
// Function to initialize pie chart
const initPieChart = () => {
const chartDom = document.getElementById('pie-chart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
top: '5%',
left: 'center'
},
series: [
{
name: 'Zaifliklar',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: 20,
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: severityCounts.Yuqori, name: 'Yuqori' },
{ value: severityCounts.Orta, name: 'O\'rta' },
{ value: severityCounts.Past, name: 'Past' }
]
}
]
};
myChart.setOption(option);
}
};
// Function to initialize bar chart
const initBarChart = () => {
const chartDom = document.getElementById('bar-chart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'shadow'
}
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: [
{
type: 'category',
data: ['Yuqori', 'O\'rta', 'Past'],
axisTick: {
alignWithLabel: true
}
}
],
yAxis: [
{
type: 'value'
}
],
series: [
{
name: 'Zaifliklar soni',
type: 'bar',
barWidth: '60%',
data: [
{
value: severityCounts.Yuqori,
itemStyle: { color: '#ff4d4f' }
},
{
value: severityCounts.Orta,
itemStyle: { color: '#faad14' }
},
{
value: severityCounts.Past,
itemStyle: { color: '#52c41a' }
}
]
}
]
};
myChart.setOption(option);
}
};
// Function to handle scan
const handleScan = () => {
if (!url) {
notification.error({
message: 'Xato',
description: 'Iltimos, tekshirish uchun URL manzilini kiriting.',
});
return;
}
if (sendToTelegram && !telegramUsername) {
notification.error({
message: 'Xato',
description: 'Iltimos, Telegram foydalanuvchi nomingizni kiriting.',
});
return;
}
setLoading(true);
// Simulate API call
setTimeout(() => {
setLoading(false);
setScanComplete(true);
// Initialize charts after data is loaded
setTimeout(() => {
initPieChart();
initBarChart();
}, 100);
notification.success({
message: 'Tekshirish yakunlandi',
description: 'Sayt zaifliklarini tekshirish muvaffaqiyatli yakunlandi.',
});
}, 3000);
};
// Function to send report to Telegram
const sendReport = () => {
if (!telegramUsername) {
notification.error({
message: 'Xato',
description: 'Iltimos, Telegram foydalanuvchi nomingizni kiriting.',
});
return;
}
notification.success({
message: 'Yuborildi',
description: `Hisobot ${telegramUsername} ga muvaffaqiyatli yuborildi.`,
});
};
// Function to download report
const downloadReport = () => {
notification.success({
message: 'Yuklab olindi',
description: 'Hisobot PDF formatida yuklab olindi.',
});
};
// Table columns for vulnerabilities
const columns = [
{
title: '#',
dataIndex: 'id',
key: 'id',
width: 50,
},
{
title: 'Zaiflik nomi',
dataIndex: 'name',
key: 'name',
},
{
title: 'Xavf darajasi',
dataIndex: 'severity',
key: 'severity',
render: (severity: string) => {
let color = '';
let icon = null;
if (severity === 'Yuqori') {
color = 'red';
icon = <ExclamationCircleOutlined />;
} else if (severity === 'O\'rta') {
color = 'orange';
icon = <WarningOutlined />;
} else {
color = 'green';
icon = <InfoCircleOutlined />;
}
return (
<Text style={{ color }}>
{icon} {severity}
</Text>
);
},
},
{
title: 'Tavsiya',
dataIndex: 'solution',
key: 'solution',
render: (solution: string) => (
<Tooltip title={solution}>
<Button type="link" icon={<InfoCircleOutlined />}>Ko'rish</Button>
</Tooltip>
),
},
];
// Initialize charts when tab changes
const handleTabChange = (key: string) => {
setActiveTab(key);
if (key === '2' && scanComplete) {
setTimeout(() => {
initPieChart();
initBarChart();
}, 100);
}
};
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
<div className="container mx-auto px-4 py-6">
<div className="flex justify-between items-center">
<div className="flex items-center">
<SecurityScanOutlined className="text-4xl mr-4" />
<div>
<h1 className="text-3xl font-bold">Website Security Scanner</h1>
<p className="text-blue-100">Saytingiz xavfsizligini tekshiring va zaifliklarni aniqlang</p>
</div>
</div>
<nav className="hidden md:flex space-x-6">
<a href="#main-section" onClick={(e) => {
e.preventDefault();
const mainSection = document.getElementById('main-section');
if (mainSection) {
    mainSection.scrollIntoView({ behavior: 'smooth' });
}
}} className="hover:text-blue-200 font-medium cursor-pointer flex items-center">
<i className="fas fa-home mr-1"></i>
Asosiy
</a>
<a href="https://readdy.ai/home/e5526b35-3d43-41d7-9716-ca0e189f7404/134c3d05-7bc2-4839-be18-5c6fe4cd32ae" data-readdy="true" className="hover:text-blue-200 font-medium cursor-pointer">Hisobot</a>
<a href="#" className="hover:text-blue-200 font-medium cursor-pointer">FAQ</a>
<a href="#" className="hover:text-blue-200 font-medium cursor-pointer">Bog'lanish</a>
</nav>
</div>
</div>
</header>
{/* Hero Section */}
<section className="relative overflow-hidden" style={{
backgroundImage: "url('https://readdy.ai/api/search-image?query=abstract%20digital%20security%20concept%20with%20shield%20and%20lock%20symbols%2C%20blue%20and%20purple%20gradient%20background%2C%20high%20tech%20cybersecurity%20visualization%20with%20code%20elements%20and%20protection%20metaphors%2C%20modern%20professional%20look&width=1440&height=500&seq=1&orientation=landscape')",
backgroundSize: 'cover',
backgroundPosition: 'center'
}}>
<div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/70"></div>
<div className="container mx-auto px-4 py-20 relative">
<div className="max-w-2xl">
<h2 className="text-4xl font-bold text-white mb-6">Saytingiz xavfsizligini tekshiring</h2>
<p className="text-xl text-blue-100 mb-8">Zamonaviy xavfsizlik skaner yordamida saytingizdagi zaifliklarni aniqlang va xavfsizlik darajasini oshiring.</p>
<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
<div className="mb-4">
<label className="block text-white mb-2">Sayt URL manzili</label>
<Input
size="large"
placeholder="https://example.com"
prefix={<i className="fas fa-globe text-gray-400"></i>}
value={url}
onChange={(e) => setUrl(e.target.value)}
className="bg-white/20 text-white border-none"
/>
</div>
<div className="mb-4">
<label className="block text-white mb-2">Telegram foydalanuvchi nomi (ixtiyoriy)</label>
<Input
size="large"
placeholder="@username"
prefix={<i className="fab fa-telegram text-gray-400"></i>}
value={telegramUsername}
onChange={(e) => setTelegramUsername(e.target.value)}
className="bg-white/20 text-white border-none"
/>
</div>
<div className="mb-4">
<Checkbox
checked={sendToTelegram}
onChange={(e) => setSendToTelegram(e.target.checked)}
className="text-white"
>
Natijalarni Telegramga yuborish
</Checkbox>
</div>
<Button
type="primary"
size="large"
icon={<SecurityScanOutlined />}
onClick={handleScan}
loading={loading}
className="w-full !rounded-button whitespace-nowrap"
style={{ backgroundColor: '#4c1d95' }}
>
Tekshirishni boshlash
</Button>
</div>
</div>
</div>
</section>
{/* Main Content */}
<main id="main-section" className="container mx-auto px-4 py-12">
{loading ? (
<div className="flex flex-col items-center justify-center py-20">
<Spin size="large" />
<p className="mt-4 text-lg text-gray-600">Sayt tekshirilmoqda, iltimos kuting...</p>
</div>
) : scanComplete ? (
<div>
{/* Summary Card */}
<Card className="mb-8 shadow-md">
<div className="flex flex-col md:flex-row items-center justify-between">
<div className="mb-6 md:mb-0">
<Title level={3}>Tekshirish natijalari: {url}</Title>
<Text type="secondary">Tekshirilgan sana: {new Date().toLocaleString('uz-UZ')}</Text>
<div className="mt-4">
<Text strong>Umumiy xavfsizlik bali:</Text>
<div className="flex items-center mt-2">
<Progress
type="circle"
percent={65}
width={80}
status="exception"
/>
<div className="ml-4">
<Text className="block">
<WarningOutlined style={{ color: '#faad14' }} /> O'rtacha xavf darajasi
</Text>
<Text type="secondary">10 ta zaiflik aniqlandi</Text>
</div>
</div>
</div>
</div>
<div className="flex flex-col space-y-3">
<Button
type="primary"
icon={<DownloadOutlined />}
onClick={downloadReport}
className="!rounded-button whitespace-nowrap"
>
PDF hisobotni yuklab olish
</Button>
<Button
type="default"
icon={<SendOutlined />}
onClick={sendReport}
className="!rounded-button whitespace-nowrap"
>
Telegramga yuborish
</Button>
</div>
</div>
</Card>
{/* Tabs for different sections */}
<Tabs defaultActiveKey="1" onChange={handleTabChange}>
<TabPane
tab={
<span>
<ExclamationCircleOutlined />
Zaifliklar
</span>
}
key="1"
>
<Card className="shadow-md">
<Title level={4}>Top 10 zaifliklar</Title>
<Table
dataSource={vulnerabilities}
columns={columns}
rowKey="id"
pagination={false}
/>
</Card>
</TabPane>
<TabPane
tab={
<span>
<i className="fas fa-chart-pie mr-2"></i>
Statistika
</span>
}
key="2"
>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Card title="Zaifliklar taqsimoti" className="shadow-md">
<div id="pie-chart" style={{ height: '400px' }}></div>
</Card>
<Card title="Xavf darajalari bo'yicha" className="shadow-md">
<div id="bar-chart" style={{ height: '400px' }}></div>
</Card>
</div>
</TabPane>
<TabPane
tab={
<span>
<FileTextOutlined />
Tavsiyalar
</span>
}
key="3"
>
<Card className="shadow-md">
<Title level={4}>Xavfsizlikni oshirish bo'yicha tavsiyalar</Title>
{vulnerabilities.map(vuln => (
<div key={vuln.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
<div className="flex items-start">
{vuln.severity === 'Yuqori' ? (
<ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '24px', marginTop: '4px', marginRight: '12px' }} />
) : vuln.severity === 'O\'rta' ? (
<WarningOutlined style={{ color: '#faad14', fontSize: '24px', marginTop: '4px', marginRight: '12px' }} />
) : (
<InfoCircleOutlined style={{ color: '#52c41a', fontSize: '24px', marginTop: '4px', marginRight: '12px' }} />
)}
<div>
<Title level={5}>{vuln.name}</Title>
<Paragraph>{vuln.description}</Paragraph>
<div className="mt-3 bg-gray-50 p-3 rounded-md">
<Text strong>Ta'siri: </Text>
<Text>{vuln.impact}</Text>
</div>
<div className="mt-3 bg-blue-50 p-3 rounded-md">
<Text strong>Yechim: </Text>
<Text>{vuln.solution}</Text>
</div>
</div>
</div>
</div>
))}
</Card>
</TabPane>
</Tabs>
</div>
) : (
<div className="py-8">
{/* Features Section */}
<section className="mb-16">
<div className="text-center mb-12">
<Title level={2}>Bizning xizmatlarimiz</Title>
<Text className="text-lg text-gray-600">Saytingiz xavfsizligini ta'minlash uchun professional yechimlar</Text>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Card
className="shadow-md hover:shadow-lg transition-shadow"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=digital%20security%20shield%20protecting%20website%20code%2C%20blue%20technology%20background%20with%20abstract%20security%20elements%2C%20professional%20cybersecurity%20visualization%2C%20modern%20high-tech%20design%20with%20glowing%20elements&width=400&height=200&seq=2&orientation=landscape"
alt="Zaifliklarni tekshirish"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<Title level={4}>Zaifliklarni tekshirish</Title>
<Text>Saytingizdagi barcha zaifliklarni aniqlab, xavfsizlik darajasini baholang.</Text>
</Card>
<Card
className="shadow-md hover:shadow-lg transition-shadow"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=real-time%20website%20security%20monitoring%20dashboard%20with%20graphs%20and%20alerts%2C%20blue%20and%20purple%20digital%20interface%2C%20professional%20cybersecurity%20visualization%20with%20data%20charts%2C%20modern%20high-tech%20monitoring%20system&width=400&height=200&seq=3&orientation=landscape"
alt="Doimiy monitoring"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<Title level={4}>Doimiy monitoring</Title>
<Text>Saytingiz xavfsizligini 24/7 rejimida kuzatib boring va xavflarni o'z vaqtida aniqlang.</Text>
</Card>
<Card
className="shadow-md hover:shadow-lg transition-shadow"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=expert%20security%20team%20fixing%20website%20vulnerabilities%2C%20professional%20cybersecurity%20specialists%20working%20with%20code%2C%20blue%20technology%20environment%2C%20modern%20high-tech%20security%20solutions%20implementation&width=400&height=200&seq=4&orientation=landscape"
alt="Xavfsizlik maslahatlar"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<Title level={4}>Xavfsizlik maslahatlar</Title>
<Text>Professional mutaxassislardan saytingiz xavfsizligini oshirish bo'yicha tavsiyalar oling.</Text>
</Card>
</div>
</section>
{/* How It Works */}
<section className="mb-16 bg-gray-100 py-12 px-8 rounded-2xl">
<div className="text-center mb-12">
<Title level={2}>Qanday ishlaydi?</Title>
<Text className="text-lg text-gray-600">Saytingiz xavfsizligini tekshirish jarayoni</Text>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="text-center">
<div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">1</div>
<Title level={4}>URL kiriting</Title>
<Text>Tekshirmoqchi bo'lgan saytingiz manzilini kiriting</Text>
</div>
<div className="text-center">
<div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">2</div>
<Title level={4}>Tekshirish</Title>
<Text>Tizim saytingizni avtomatik ravishda tekshiradi</Text>
</div>
<div className="text-center">
<div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">3</div>
<Title level={4}>Natijalar</Title>
<Text>Aniqlangan zaifliklar va tavsiyalarni ko'ring</Text>
</div>
<div className="text-center">
<div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">4</div>
<Title level={4}>Hisobot</Title>
<Text>Batafsil hisobotni yuklab oling yoki Telegramga yuboring</Text>
</div>
</div>
</section>
{/* Testimonials */}
<section className="mb-16">
<div className="text-center mb-12">
<Title level={2}>Mijozlar fikrlari</Title>
<Text className="text-lg text-gray-600">Bizning xizmatlarimizdan foydalangan mijozlar nima deyishadi</Text>
</div>
<Swiper
modules={[Pagination, Autoplay]}
spaceBetween={30}
slidesPerView={1}
pagination={{ clickable: true }}
autoplay={{ delay: 5000 }}
breakpoints={{
640: {
slidesPerView: 1,
},
768: {
slidesPerView: 2,
},
1024: {
slidesPerView: 3,
},
}}
className="testimonial-swiper"
>
<SwiperSlide>
<Card className="shadow-md h-full">
<div className="flex flex-col h-full">
<div className="text-yellow-400 mb-4">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<Paragraph className="flex-grow">
"Bu xizmat bizning kompaniya saytidagi bir nechta jiddiy zaifliklarni aniqlashga yordam berdi. Tavsiyalar juda foydali bo'ldi va biz ularni tezda bartaraf etdik."
</Paragraph>
<div className="flex items-center mt-4">
<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
<TeamOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
</div>
<div className="ml-4">
<Text strong>Akmal Karimov</Text>
<Text type="secondary" className="block">IT Menejeri, TechSolutions</Text>
</div>
</div>
</div>
</Card>
</SwiperSlide>
<SwiperSlide>
<Card className="shadow-md h-full">
<div className="flex flex-col h-full">
<div className="text-yellow-400 mb-4">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<Paragraph className="flex-grow">
"Bizning internet-do'konimiz xavfsizligini tekshirish natijasida bir nechta muhim zaifliklarni aniqladik. Hisobotlar juda tushunarli va tavsiyalar aniq."
</Paragraph>
<div className="flex items-center mt-4">
<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
<TeamOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
</div>
<div className="ml-4">
<Text strong>Nilufar Azimova</Text>
<Text type="secondary" className="block">Direktor, ShopMart</Text>
</div>
</div>
</div>
</Card>
</SwiperSlide>
<SwiperSlide>
<Card className="shadow-md h-full">
<div className="flex flex-col h-full">
<div className="text-yellow-400 mb-4">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star-half-alt"></i>
</div>
<Paragraph className="flex-grow">
"Doimiy monitoring xizmati bizning saytimizni xakerlar hujumidan saqlashga yordam berdi. Tezkor xabarnomalar tufayli muammolarni o'z vaqtida hal qildik."
</Paragraph>
<div className="flex items-center mt-4">
<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
<TeamOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
</div>
<div className="ml-4">
<Text strong>Bobur Raximov</Text>
<Text type="secondary" className="block">CTO, FinTech Solutions</Text>
</div>
</div>
</div>
</Card>
</SwiperSlide>
<SwiperSlide>
<Card className="shadow-md h-full">
<div className="flex flex-col h-full">
<div className="text-yellow-400 mb-4">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<Paragraph className="flex-grow">
"Juda qulay va foydali xizmat. Biz har oyda bir marta tekshiruvdan o'tkazamiz va yangi zaifliklarni aniqlaymiz. Telegramga yuborish funksiyasi juda qulay."
</Paragraph>
<div className="flex items-center mt-4">
<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
<TeamOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
</div>
<div className="ml-4">
<Text strong>Dilshod Toshmatov</Text>
<Text type="secondary" className="block">Veb-dasturchi, CreativeAgency</Text>
</div>
</div>
</div>
</Card>
</SwiperSlide>
</Swiper>
</section>
{/* FAQ */}
<section className="mb-16">
<div className="text-center mb-12">
<Title level={2}>Ko'p so'raladigan savollar</Title>
<Text className="text-lg text-gray-600">Xizmatimiz haqida eng ko'p so'raladigan savollar</Text>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<Card className="shadow-md">
<Title level={4}>
<QuestionCircleOutlined className="mr-2 text-blue-600" />
Tekshirish qancha vaqt oladi?
</Title>
<Paragraph>
Sayt hajmi va murakkabligiga qarab, tekshirish 3-5 daqiqadan 15-20 daqiqagacha vaqt olishi mumkin. Katta va murakkab saytlar uchun ko'proq vaqt talab etiladi.
</Paragraph>
</Card>
<Card className="shadow-md">
<Title level={4}>
<QuestionCircleOutlined className="mr-2 text-blue-600" />
Qanday zaifliklarni tekshirasiz?
</Title>
<Paragraph>
Bizning tizimimiz 100 dan ortiq zaifliklarni tekshiradi, jumladan SQL in'ektsiya, XSS, CSRF, zaif parollar, SSL/TLS zaifliklar, ochiq portlar va boshqalar.
</Paragraph>
</Card>
<Card className="shadow-md">
<Title level={4}>
<QuestionCircleOutlined className="mr-2 text-blue-600" />
Hisobotlarni qanday formatda olish mumkin?
</Title>
<Paragraph>
Hisobotlarni PDF formatida yuklab olish yoki to'g'ridan-to'g'ri Telegram messenjeriga yuborish mumkin. Hisobotda barcha aniqlangan zaifliklar, tavsiyalar va statistika mavjud.
</Paragraph>
</Card>
<Card className="shadow-md">
<Title level={4}>
<QuestionCircleOutlined className="mr-2 text-blue-600" />
Xizmat pullikmi?
</Title>
<Paragraph>
Bizda bepul va pullik tariflar mavjud. Bepul tarif asosiy zaifliklarni tekshiradi, pullik tariflar esa chuqurroq tahlil, doimiy monitoring va professional maslahatlarni o'z ichiga oladi.
</Paragraph>
</Card>
</div>
</section>
{/* CTA */}
<section className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl p-10 text-white text-center">
<Title level={2} className="text-white mb-6">Saytingiz xavfsizligini tekshiring</Title>
<Paragraph className="text-xl mb-8 text-blue-100">
Hoziroq tekshiruvni boshlang va saytingiz xavfsizligini ta'minlang
</Paragraph>
<Button
type="primary"
size="large"
icon={<SecurityScanOutlined />}
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
className="!rounded-button whitespace-nowrap"
style={{ backgroundColor: 'white', color: '#4338ca' }}
>
Tekshirishni boshlash
</Button>
</section>
</div>
)}
</main>
{/* Footer */}
<footer className="bg-gray-900 text-white py-12">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div>
<div className="flex items-center mb-4">
<SecurityScanOutlined className="text-3xl mr-3" />
<span className="text-xl font-bold">Website Security Scanner</span>
</div>
<p className="text-gray-400 mb-4">
Saytingiz xavfsizligini ta'minlash uchun professional yechimlar
</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-facebook-f text-xl"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-twitter text-xl"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-linkedin-in text-xl"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-telegram text-xl"></i>
</a>
</div>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Xizmatlar</h3>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Zaifliklarni tekshirish</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Doimiy monitoring</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Xavfsizlik maslahatlar</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Penetration Testing</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Xavfsizlik auditi</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Foydali havolalar</h3>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Biz haqimizda</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">FAQ</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Blog</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Tariflar</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Bog'lanish</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Bog'lanish</h3>
<ul className="space-y-2">
<li className="flex items-start">
<i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
<span className="text-gray-400">Toshkent sh., Amir Temur ko'chasi, 108-uy</span>
</li>
<li className="flex items-start">
<i className="fas fa-phone-alt mt-1 mr-3 text-gray-400"></i>
<span className="text-gray-400">+998 90 123 45 67</span>
</li>
<li className="flex items-start">
<i className="fas fa-envelope mt-1 mr-3 text-gray-400"></i>
<span className="text-gray-400">info@websecurity.uz</span>
</li>
</ul>
<div className="mt-4 flex items-center">
<span className="mr-3 text-gray-400">To'lov usullari:</span>
<div className="flex space-x-3">
<i className="fab fa-cc-visa text-xl text-gray-400"></i>
<i className="fab fa-cc-mastercard text-xl text-gray-400"></i>
<i className="fab fa-paypal text-xl text-gray-400"></i>
</div>
</div>
</div>
</div>
<div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400 mb-4 md:mb-0">
&copy; {new Date().getFullYear()} Website Security Scanner. Barcha huquqlar himoyalangan.
</p>
<div className="flex space-x-6">
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">Maxfiylik siyosati</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">Foydalanish shartlari</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">Yordam</a>
</div>
</div>
</div>
</footer>
</div>
);
};
export default App
