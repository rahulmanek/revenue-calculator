import React, { useState, useEffect } from 'react';

// --- Constants ---

const eCpmByTier = {
  1: 0.87,
  2: 0.61,
  3: 0.39,
};

const tooltipContent = {
  rpm: "Also known as effective cost per mile, RPM measures as monetization performance based on revenue earned per 1000 impressions RPM = Total Ad Earnings / Impressions x 1000",
  pageviews: "The number of uniquely identifiable users that visit a publisher’s website every month.",
  adUnits: "The average number of ads publishers can place per page. The total number of ad units must not exceed or overlap the content.",
  tier1: "Australia, Austria, Belgium, Canada, Denmark, Finland, France, Germany, Ireland, Italy, Luxembourg, Netherlands, New Zealand, Norway, Spain, Sweden, Switzerland, United Kingdom, United States of America",
  tier2: "Argentina, Bahamas, Belarus, Bolivia, Brazil, Bulgaria, Chile, China, Colombia, Costa Rica, Croatia, Cyprus, Egypt, Estonia, Fiji, Greece, Hong Kong, Hungary, Iceland, Indonesia, Israel, Japan, Latvia, Lithuania, Macao, Malaysia, Malta, Mexico, Morocco, Nepal, Oman, Panama, Paraguay, Peru, Philippines, Poland, Portugal, Puerto Rico, Qatar, Republic of Korea (South), Romania, Russian Federation, Saudi Arabia, Serbia, Singapore, Slovakia, Slovenia, South Africa, Thailand, Turkey, Ukraine, United Arab Emirates, Uruguay",
  tier3: "Albania, Algeria, Angola, Armenia, Bahrain, Bangladesh, Barbados, Cambodia, Cape Verde, Chad, Congo, Ethiopia, Georgia, Guatemala, Haiti, India, Iraq, Jamaica, Jordan, Kenya, Kuwait, Lebanon, Macedonia, Madagascar, Mauritania, Mauritius, Nigeria, Pakistan, Sri Lanka, Tajikistan, Tanzania, Trinidad, Uganda, Uzbekistan, Vietnam, Zambia"
};


// --- Reusable UI Components ---

const TooltipIcon = ({ tooltipKey, activeTooltip, setActiveTooltip }) => {
  const showTooltip = activeTooltip === tooltipKey;
  
  return (
    <div className="m2-relative m2-flex m2-items-center">
      <div 
        className="m2-w-4 m2-h-4 m2-bg-gray-600 m2-rounded-full m2-flex m2-items-center m2-justify-center m2-cursor-pointer hover:m2-bg-gray-700 m2-transition-colors m2-duration-200"
        onMouseEnter={() => setActiveTooltip(tooltipKey)}
        onMouseLeave={() => setActiveTooltip(null)}
      >
        <span className="m2-text-white m2-text-xs">?</span>
      </div>
      
      {showTooltip && tooltipContent[tooltipKey] && (
        <div className="m2-absolute m2-z-50 m2-left-6 m2-top-1/2 m2-transform m2--translate-y-1/2 m2-flex m2-items-center">
          <div className="m2-w-0 m2-h-0 m2-border-t-8 m2-border-b-8 m2-border-r-8 m2-border-t-transparent m2-border-b-transparent m2-border-r-blue-500"></div>
          <div className="m2-bg-blue-500 m2-text-white m2-text-xs m2-rounded m2-shadow-lg m2-p-2 m2-w-80 m2-leading-relaxed">
            {tooltipContent[tooltipKey]}
          </div>
        </div>
      )}
    </div>
  );
};

const InputRow = ({ label, tooltipKey, value, onChange, error, type = "text", activeTooltip, setActiveTooltip, isCurrency = false, isPercent = false }) => {
  let displayValue = value;
  if (isCurrency) {
      displayValue = `$${value}`;
  } else if (isPercent) {
      displayValue = `${value}%`;
  } else if (type === 'text' && !isCurrency) {
    // Check if value is a number or a string that can be converted to a number
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (!isNaN(numericValue)) {
      displayValue = new Intl.NumberFormat('en-US').format(numericValue);
    }
  }

  return (
    <div>
      <div className="m2-flex m2-items-center m2-justify-between m2-gap-4">
        <div className="m2-flex m2-items-center">
          <label className="m2-text-sm m2-font-normal m2-text-gray-700 m2-mr-2">{label}</label>
          <TooltipIcon tooltipKey={tooltipKey} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} />
        </div>
        <input
          type={type}
          value={displayValue}
          onChange={onChange}
          className={`m2-w-40 md:m2-w-48 m2-px-3 m2-py-2 m2-text-sm m2-text-center m2-border-2 m2-rounded focus:m2-outline-none ${error ? 'm2-border-red-500' : 'm2-border-gray-300 focus:m2-border-blue-500'}`}
          style={type === 'number' ? { MozAppearance: 'textfield' } : {}}
        />
      </div>
      {error && <p className="m2-text-red-500 m2-text-xs m2-text-right m2-mt-1">{error}</p>}
    </div>
  );
};

// --- Main Feature Panels ---

const MetricsPanel = ({ rpm, handleRpmChange, pageviews, handlePageviewsChange, adUnits, handleAdUnitsChange, errors, activeTooltip, setActiveTooltip }) => (
    <div className="m2-mb-8">
        <h1 className="m2-text-2xl m2-font-semibold m2-text-gray-900 m2-mb-2">METRICS</h1>
        <p className="m2-text-m m2-text-gray-700 m2-mb-3 m2-leading-relaxed">
            Use the scale below to input your actual metrics so we can give you an accurate estimate for your annual revenue.
        </p>
        <div className="m2-space-y-4">
            <InputRow 
                label="RPM"
                tooltipKey="rpm"
                value={rpm}
                onChange={handleRpmChange}
                error={errors.rpm}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                isCurrency={true}
            />
            <InputRow 
                label="Pageviews Per Month"
                tooltipKey="pageviews"
                value={pageviews}
                onChange={handlePageviewsChange}
                error={errors.pageviews}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
            />
            <InputRow 
                label="Average Ad Units per Page"
                tooltipKey="adUnits"
                value={adUnits}
                onChange={handleAdUnitsChange}
                error={errors.adUnits}
                type="number"
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
            />
        </div>
    </div>
);

const TrafficQualityPanel = ({ tier1, tier2, tier3, handleTier1Change, handleTier2Change, handleTier3Change, errors, activeTooltip, setActiveTooltip }) => (
    <div>
        <h2 className="m2-text-2xl m2-font-semibold m2-text-gray-900 m2-mb-2">TRAFFIC QUALITY</h2>
        <p className="m2-text-m m2-text-gray-700 m2-mb-3 m2-leading-relaxed">
            Do the same with your traffic metrics. Traffic by country is divided into tiers to determine traffic quality and potential revenue.
        </p>
        <div className="m2-space-y-4">
            <InputRow 
                label="Tier 1 Countries"
                tooltipKey="tier1"
                value={tier1}
                onChange={handleTier1Change}
                error={errors.tier1 || (errors.tierTotal ? ' ' : '')}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                isPercent={true}
            />
            <InputRow 
                label="Tier 2 Countries"
                tooltipKey="tier2"
                value={tier2}
                onChange={handleTier2Change}
                error={errors.tier2 || (errors.tierTotal ? ' ' : '')}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                isPercent={true}
            />
            <InputRow 
                label="Tier 3 Countries"
                tooltipKey="tier3"
                value={tier3}
                onChange={handleTier3Change}
                error={errors.tier3 || (errors.tierTotal ? ' ' : '')}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                isPercent={true}
            />
        </div>
        {errors.tierTotal && <p className="m2-text-red-500 m2-text-xs m2-text-center m2-mt-2">{errors.tierTotal}</p>}
    </div>
);

const ResultsPanel = ({ currentRevenue, revenueWithMonetizeMore, uplift, formatCurrency }) => (
    <div className="m2-w-full md:m2-w-6/12 md:m2-pl-8">
        <div className="m2-bg-white m2-rounded m2-p-4 md:m2-p-8 m2-border m2-border-[#D5D5DC]">
            <h2 className="m2-text-xl md:m2-text-2xl m2-font-semibold m2-text-gray-900 m2-mb-6">Your result</h2>
            
            <div className="m2-rounded m2-p-4 md:m2-p-6 lg:m2-p-7 m2-mb-9 m2-relative m2-bg-[#191919]">
                <div className="m2-flex m2-flex-row m2-items-center m2-justify-between m2-gap-2 md:m2-gap-4 lg:m2-gap-6">
                    <div className="m2-flex m2-flex-row m2-items-center m2-my-1">
                        <div className="m2-mr-2 md:m2-mr-4 m2-mt-1.5 m2-flex-shrink-0">
                            <svg className="m2-w-7 m2-h-auto" viewBox="0 0 28 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 103L14 6" stroke="white" strokeWidth="3"/>
                                <path d="M2 16L14 3L26 16" stroke="white" strokeWidth="3"/>
                            </svg>
                        </div>
                        <div>
                            <span className="m2-text-white m2-text-3xl md:m2-text-4xl lg:m2-text-5xl m2-font-medium m2-whitespace-nowrap">30-250%</span>
                            <p className="m2-text-gray-300 m2-text-[11px] md:m2-text-xs m2-mt-2 m2-font-light m2-tracking-wide">
                                Annual Revenue Uplift with <br className="m2-hidden sm:m2-block" />MonetizeMore
                            </p>
                        </div>
                    </div>
                    
                    <div className="m2-flex m2-items-end m2-h-24 m2-w-24 md:m2-h-28 md:m2-w-28 lg:m2-h-32 lg:m2-w-32 m2-flex-shrink-0 md:m2-hidden lg:m2-flex">
                        <svg width="100%" height="100%" viewBox="0 0 125 132" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                            <g clipPath="url(#clip0_587_3382)"><rect width="1" height="105" transform="matrix(1 0 0 -1 6 105)" fill="#464652"/><path d="M0 70.5C0 66.9101 2.91015 64 6.5 64C10.0899 64 13 66.9101 13 70.5V132H0V70.5Z" fill="url(#paint0_linear_587_3382)"/><rect width="1" height="68" transform="matrix(1 0 0 -1 6 132)" fill="url(#paint1_linear_587_3382)"/></g><g clipPath="url(#clip1_587_3382)"><rect width="1" height="105" transform="matrix(1 0 0 -1 34 105)" fill="#464652"/><path d="M28 50.5C28 46.9101 30.9101 44 34.5 44C38.0899 44 41 46.9101 41 50.5V132H28V50.5Z" fill="url(#paint2_linear_587_3382)"/><rect width="1" height="88" transform="matrix(1 0 0 -1 34 132)" fill="url(#paint3_linear_587_3382)"/></g><g clipPath="url(#clip2_587_3382)"><rect width="1" height="105" transform="matrix(1 0 0 -1 62 105)" fill="#464652"/><path d="M56 68.5C56 64.9101 58.9101 62 62.5 62C66.0899 62 69 64.9101 69 68.5V132H56V68.5Z" fill="url(#paint4_linear_587_3382)"/><rect width="1" height="70" transform="matrix(1 0 0 -1 62 132)" fill="url(#paint5_linear_587_3382)"/></g><g clipPath="url(#clip3_587_3382)"><rect width="1" height="105" transform="matrix(1 0 0 -1 90 105)" fill="#464652"/><path d="M84 43.5C84 39.9102 86.9101 37 90.5 37C94.0899 37 97 39.9101 97 43.5V132H84V43.5Z" fill="url(#paint6_linear_587_3382)"/><rect width="1" height="95" transform="matrix(1 0 0 -1 90 132)" fill="url(#paint7_linear_587_3382)"/></g><g clipPath="url(#clip4_587_3382)"><rect width="1" height="105" transform="matrix(1 0 0 -1 118 105)" fill="#464652"/><path d="M112 23.5C112 19.9101 114.91 17 118.5 17C122.09 17 125 19.9101 125 23.5V132H112V23.5Z" fill="url(#paint8_linear_587_3382)"/><rect width="1" height="115" transform="matrix(1 0 0 -1 118 132)" fill="url(#paint9_linear_587_3382)"/></g>
                            <defs>
                                <linearGradient id="paint0_linear_587_3382" x1="6.5" y1="64" x2="6.5" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#1190C8"/><stop offset="1" stopColor="#191919"/></linearGradient>
                                <linearGradient id="paint1_linear_587_3382" x1="0.5" y1="68" x2="0.5" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient>
                                <linearGradient id="paint2_linear_587_3382" x1="34.5" y1="44" x2="34.5" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#1190C8"/><stop offset="1" stopColor="#191919"/></linearGradient>
                                <linearGradient id="paint3_linear_587_3382" x1="0.5" y1="88" x2="0.5" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient>
                                <linearGradient id="paint4_linear_587_3382" x1="62.5" y1="62" x2="62.5" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#1190C8"/><stop offset="1" stopColor="#191919"/></linearGradient>
                                <linearGradient id="paint5_linear_587_3382" x1="0.5" y1="70" x2="0.5" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient>
                                <linearGradient id="paint6_linear_587_3382" x1="90.5" y1="37" x2="90.5" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#1190C8"/><stop offset="1" stopColor="#191919"/></linearGradient>
                                <linearGradient id="paint7_linear_587_3382" x1="0.5" y1="95" x2="0.5" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient>
                                <linearGradient id="paint8_linear_587_3382" x1="118.5" y1="17" x2="118.5" y2="132" gradientUnits="userSpaceOnUse"><stop stopColor="#1190C8"/><stop offset="1" stopColor="#191919"/></linearGradient>
                                <linearGradient id="paint9_linear_587_3382" x1="0.5" y1="115" x2="0.5" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient>
                                <clipPath id="clip0_587_3382"><rect width="13" height="132" fill="white"/></clipPath>
                                <clipPath id="clip1_587_3382"><rect width="13" height="132" fill="white" transform="translate(28)"/></clipPath>
                                <clipPath id="clip2_587_3382"><rect width="13" height="132" fill="white" transform="translate(56)"/></clipPath>
                                <clipPath id="clip3_587_3382"><rect width="13" height="132" fill="white" transform="translate(84)"/></clipPath>
                                <clipPath id="clip4_587_3382"><rect width="13" height="132" fill="white" transform="translate(112)"/></clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="m2-space-y-2 m2-mb-10">
                <div className="m2-flex m2-flex-row m2-justify-between m2-items-center">
                    <span className="m2-text-gray-700 m2-text-base m2-font-normal">Annual Revenue</span>
                    <span className="m2-text-lg m2-font-semibold m2-text-gray-900">{formatCurrency(currentRevenue)}</span>
                </div>
                <div className="m2-flex m2-flex-row m2-justify-between m2-items-center">
                    <span className="m2-text-gray-700 m2-text-base m2-font-normal">Annual Revenue with MonetizeMore</span>
                    <span className="m2-text-lg m2-font-semibold m2-text-gray-900">{formatCurrency(revenueWithMonetizeMore)}</span>
                </div>
            </div>

            <div className="m2-border-t m2-border-gray-200 m2-pt-6 m2-mb-6">
                <div className="m2-flex m2-flex-col m2-text-center lg:m2-text-left lg:m2-flex-row lg:m2-justify-between lg:m2-items-center m2-gap-2">
                    <span className="m2-text-gray-900 m2-text-lg m2-font-semibold">Uplift with MonetizeMore</span>
                    <span className="m2-text-3xl m2-font-semibold m2-text-gray-900">{formatCurrency(uplift)}</span>
                </div>
            </div>

            <button className="m2-w-full m2-text-white m2-text-xl m2-font-medium m2-py-4 m2-px-6 m2-rounded m2-transition-colors m2-duration-200 m2-mb-6 hover:m2-brightness-90 tracking-wide bg-[#AA3492]">
                Maximize revenue with MonetizeMore
            </button>

            <p className="m2-text-gray-500 m2-text-sm m2-leading-relaxed m2-ml-1">
                Revenue projections are approximate and depend on various factors, including traffic quality and market trends.
            </p>
        </div>
    </div>
);


// --- Main App Component ---

const App = () => {
  // --- STATE MANAGEMENT ---
  const [rpm, setRpm] = useState('0.63');
  const [pageviews, setPageviews] = useState(10000000);
  const [adUnits, setAdUnits] = useState(2);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [tier1, setTier1] = useState(34);
  const [tier2, setTier2] = useState(33);
  const [tier3, setTier3] = useState(33);
  const [errors, setErrors] = useState({
    rpm: '',
    pageviews: '',
    adUnits: '',
    tier1: '',
    tier2: '',
    tier3: '',
    tierTotal: ''
  });

  // --- EFFECTS ---
  useEffect(() => {
    const totalTiers = tier1 + tier2 + tier3;
    if (totalTiers > 100) {
      setErrors(prev => ({ ...prev, tierTotal: 'Total tier percentage sum cannot exceed 100.' }));
    } else {
      setErrors(prev => ({ ...prev, tierTotal: '' }));
    }
  }, [tier1, tier2, tier3]);

  useEffect(() => {
    const totalTiers = tier1 + tier2 + tier3;
    if (totalTiers <= 100) {
        const calculatedRpm = (tier1 * eCpmByTier[1] / 100) + 
                              (tier2 * eCpmByTier[2] / 100) + 
                              (tier3 * eCpmByTier[3] / 100);
        setRpm(calculatedRpm.toFixed(2));
    }
  }, [tier1, tier2, tier3]);


  // --- REVENUE CALCULATION ---
  const calculateRevenue = () => {
    if ((tier1 + tier2 + tier3 > 100) || parseFloat(rpm || '0') <= 0) {
        return 0;
    }
    const monthlyRevenue = (pageviews * parseFloat(rpm || '0') * adUnits) / 1000;
    return monthlyRevenue * 12;
  };

  const currentRevenue = calculateRevenue();
  const revenueWithMonetizeMore = currentRevenue * 1.33; 
  const uplift = revenueWithMonetizeMore - currentRevenue;

  // --- UTILITY FUNCTIONS ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // --- INPUT HANDLERS ---
  const handleRpmChange = (e) => {
    const value = e.target.value;
    // Remove anything that isn't a digit or the first decimal point
    let numericString = value.replace(/[^0-9.]/g, '');
    const parts = numericString.split('.');
    if (parts.length > 2) {
      numericString = parts[0] + '.' + parts.slice(1).join('');
    }
    
    setRpm(numericString);

    const numericValue = parseFloat(numericString);
    if (numericString && (numericValue < 0.01 || numericValue > 10)) {
      setErrors(prev => ({ ...prev, rpm: 'Value must be between 0.01 and 10.' }));
    } else {
      setErrors(prev => ({ ...prev, rpm: '' }));
    }
  };
  
  const handlePageviewsChange = (e) => {
    // Remove all non-numeric characters and parse to integer
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
    setPageviews(value);

    if (value < 1000000 || value > 50000000) {
      setErrors(prev => ({ ...prev, pageviews: 'Value must be between 1,000,000 and 50,000,000.' }));
    } else {
      setErrors(prev => ({ ...prev, pageviews: '' }));
    }
  };

  const handleAdUnitsChange = (e) => {
    // Remove all non-numeric characters and parse to integer
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
    setAdUnits(value);

    if (value < 1 || value > 10) {
      setErrors(prev => ({ ...prev, adUnits: 'Value must be between 1 and 10.' }));
    } else {
      setErrors(prev => ({ ...prev, adUnits: '' }));
    }
  };

  const handleTierChange = (setter) => (e) => {
    // Remove all non-numeric characters
    const numericString = e.target.value.replace(/[^0-9]/g, '');
    let value = numericString ? parseInt(numericString, 10) : 0;
    
    if (value > 100) value = 100;
    
    setter(value);
  };

  // --- RENDER ---
  return (
    // This ID is the key for the `important` strategy in the config
    <div id="m2-revenue-calculator">
        <div className="m2-flex m2-flex-col md:m2-flex-row m2-bg-gray-50 m2-p-4 md:m2-p-8 m2-font-sans">
            {/* Left Panel */}
            <div className="m2-w-full md:m2-w-[55%] md:m2-pr-8 m2-mb-8 md:m2-mb-0">
                <MetricsPanel 
                    rpm={rpm} handleRpmChange={handleRpmChange}
                    pageviews={pageviews} handlePageviewsChange={handlePageviewsChange}
                    adUnits={adUnits} handleAdUnitsChange={handleAdUnitsChange}
                    errors={errors}
                    activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip}
                />
                <TrafficQualityPanel
                    tier1={tier1} 
                    tier2={tier2} 
                    tier3={tier3}
                    handleTier1Change={handleTierChange(setTier1, 'tier1')}
                    handleTier2Change={handleTierChange(setTier2, 'tier2')}
                    handleTier3Change={handleTierChange(setTier3, 'tier3')}
                    errors={errors}
                    activeTooltip={activeTooltip} 
                    setActiveTooltip={setActiveTooltip}
                />
            </div>

            {/* Right Panel */}
            <ResultsPanel 
                currentRevenue={currentRevenue}
                revenueWithMonetizeMore={revenueWithMonetizeMore}
                uplift={uplift}
                formatCurrency={formatCurrency}
            />
        </div>
    </div>
  );
};

export default App;
