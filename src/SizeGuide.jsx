import React from 'react';
import SEO from './SEO.jsx';

const SizeGuide = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12">
      <SEO title="Size Guide — CRWN3" description="Detailed size conversions and measuring tips for Nigeria, US and UK sizes." />
      <h1 className="text-3xl font-bold mb-6">Size Guide</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">How to measure</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Use a soft measuring tape and keep it parallel to the floor. Measure over light clothing for the most accurate fit.</p>
        <ul className="list-disc ml-5 mt-3 text-gray-700 dark:text-gray-300">
          <li><strong>Chest / Bust:</strong> Measure around the fullest part of your chest/bust, under the arms.</li>
          <li><strong>Waist:</strong> Measure at the natural waistline, typically the narrowest part of the torso.</li>
          <li><strong>Hips:</strong> Measure around the fullest part of your hips and buttocks.</li>
          <li><strong>Inseam (for pants):</strong> Measure from the top of the inner thigh down to the ankle.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Size Comparison</h2>
        {/* Desktop table for md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-600 dark:text-gray-400">
                <th className="border-b pb-2">International</th>
                <th className="border-b pb-2">Nigeria</th>
                <th className="border-b pb-2">US</th>
                <th className="border-b pb-2">UK</th>
                <th className="border-b pb-2">Chest / Bust (cm)</th>
                <th className="border-b pb-2">Waist (cm)</th>
                <th className="border-b pb-2">Hips (cm)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-3">XS</td>
                <td>34</td>
                <td>XS / 0–2</td>
                <td>6</td>
                <td>78–82</td>
                <td>60–64</td>
                <td>84–88</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td className="py-3">S</td>
                <td>36</td>
                <td>S / 4–6</td>
                <td>8</td>
                <td>83–88</td>
                <td>65–70</td>
                <td>89–94</td>
              </tr>
              <tr>
                <td className="py-3">M</td>
                <td>38</td>
                <td>M / 8–10</td>
                <td>10</td>
                <td>89–95</td>
                <td>71–78</td>
                <td>95–102</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td className="py-3">L</td>
                <td>40</td>
                <td>L / 12–14</td>
                <td>12</td>
                <td>96–102</td>
                <td>79–86</td>
                <td>103–110</td>
              </tr>
              <tr>
                <td className="py-3">XL</td>
                <td>42</td>
                <td>XL / 16–18</td>
                <td>14</td>
                <td>103–110</td>
                <td>87–96</td>
                <td>111–120</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden grid gap-3">
          {[
            { size: 'XS', nigeria: '34', us: '0–2', uk: '6', chest: '78–82', waist: '60–64', hips: '84–88' },
            { size: 'S', nigeria: '36', us: '4–6', uk: '8', chest: '83–88', waist: '65–70', hips: '89–94' },
            { size: 'M', nigeria: '38', us: '8–10', uk: '10', chest: '89–95', waist: '71–78', hips: '95–102' },
            { size: 'L', nigeria: '40', us: '12–14', uk: '12', chest: '96–102', waist: '79–86', hips: '103–110' },
            { size: 'XL', nigeria: '42', us: '16–18', uk: '14', chest: '103–110', waist: '87–96', hips: '111–120' },
          ].map(row => (
            <div key={row.size} className="p-3 border rounded-md bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <strong>{row.size}</strong>
                <span className="text-sm text-gray-500">NG {row.nigeria} · US {row.us} · UK {row.uk}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <div><strong>Chest:</strong> {row.chest} cm</div>
                <div><strong>Waist:</strong> {row.waist} cm</div>
                <div><strong>Hips:</strong> {row.hips} cm</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Note: Conversion tables are approximate. Some products may have their own size recommendations in the product description.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for best fit</h2>
        <ul className="list-disc ml-5 mt-3 text-gray-700 dark:text-gray-300">
          <li>When in doubt choose the larger size for a more relaxed fit.</li>
          <li>Check the product page for specific fit notes (slim / regular / oversized).</li>
          <li>Use our customer reviews to see how other buyers found the fit.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Shoe Size Guide</h2>
        <p className="text-gray-700 dark:text-gray-300">Below is a conversion chart to help choose the right shoe size. Measure your foot length (heel to longest toe) in centimeters and use the chart to find the recommended size.</p>

        {/* Desktop table for md+ */}
        <div className="hidden md:block overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-600 dark:text-gray-400">
                <th className="border-b pb-2">Foot Length (cm)</th>
                <th className="border-b pb-2">Nigeria</th>
                <th className="border-b pb-2">US (Men)</th>
                <th className="border-b pb-2">US (Women)</th>
                <th className="border-b pb-2">UK</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {[
                { cm: '23.0', ng: '36', usm: '5', usw: '6.5', uk: '3' },
                { cm: '23.5', ng: '37', usm: '5.5', usw: '7', uk: '4' },
                { cm: '24.0', ng: '38', usm: '6', usw: '7.5', uk: '5' },
                { cm: '24.5', ng: '39', usm: '6.5', usw: '8', uk: '6' },
                { cm: '25.0', ng: '40', usm: '7', usw: '8.5', uk: '6.5' },
                { cm: '25.5', ng: '41', usm: '7.5', usw: '9', uk: '7' },
                { cm: '26.0', ng: '42', usm: '8', usw: '9.5', uk: '8' },
                { cm: '26.5', ng: '43', usm: '8.5', usw: '10', uk: '9' },
                { cm: '27.0', ng: '44', usm: '9', usw: '10.5', uk: '9.5' },
                { cm: '27.5', ng: '45', usm: '9.5', usw: '11', uk: '10' },
                { cm: '28.0', ng: '46', usm: '10', usw: '11.5', uk: '11' },
              ].map(row => (
                <tr key={row.cm} className="border-b">
                  <td className="py-2">{row.cm}</td>
                  <td>{row.ng}</td>
                  <td>{row.usm}</td>
                  <td>{row.usw}</td>
                  <td>{row.uk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden grid gap-3 mt-4">
          {[
            { cm: '23.0', ng: '36', usm: '5', usw: '6.5', uk: '3' },
            { cm: '23.5', ng: '37', usm: '5.5', usw: '7', uk: '4' },
            { cm: '24.0', ng: '38', usm: '6', usw: '7.5', uk: '5' },
            { cm: '24.5', ng: '39', usm: '6.5', usw: '8', uk: '6' },
            { cm: '25.0', ng: '40', usm: '7', usw: '8.5', uk: '6.5' },
            { cm: '25.5', ng: '41', usm: '7.5', usw: '9', uk: '7' },
            { cm: '26.0', ng: '42', usm: '8', usw: '9.5', uk: '8' },
            { cm: '26.5', ng: '43', usm: '8.5', usw: '10', uk: '9' },
            { cm: '27.0', ng: '44', usm: '9', usw: '10.5', uk: '9.5' },
            { cm: '27.5', ng: '45', usm: '9.5', usw: '11', uk: '10' },
            { cm: '28.0', ng: '46', usm: '10', usw: '11.5', uk: '11' },
          ].map(row => (
            <div key={row.cm} className="p-3 border rounded-md bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center">
                <strong>{row.cm} cm</strong>
                <span className="text-sm text-gray-500">NG {row.ng}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <div><strong>US (Men):</strong> {row.usm}</div>
                <div><strong>US (Women):</strong> {row.usw}</div>
                <div><strong>UK:</strong> {row.uk}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Tip: Measure both feet and choose the size that fits the larger foot. Add 0.5–1.0 cm for comfortable fit if you prefer extra space or thicker socks.</p>
      </section>

    </main>
  );
}

export default SizeGuide;
