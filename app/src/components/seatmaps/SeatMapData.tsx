import React from 'react';

// Common props for all maps
interface MapProps {
    className?: string;
    style?: React.CSSProperties;
}

export const Map1: React.FC<MapProps> = (props) => (
    <svg {...props} viewBox="0 0 10240 7680" style={{ ...props.style, backgroundImage: 'url("https://mapsapi.tmol.io/maps/geometry/image/30/20/302031?removeFilters=ISM_Shadow&avertaFonts=true&app=PRD2663_EDP_NA")' }}>
        <g className="seats"></g>
        <g className="polygons">
            <path data-component="svg__section" data-section-id="s_24" data-section-name="FLOOR - Standing Room Only" className="block is-ga is-available is-filtered minimum" d="M841.738,1844.06L3759.34,1844.06L3759.34,364.162L8309.31,364.162L8309.31,5389.03L841.738,5389.03L841.738,1844.06Z"></path>
        </g>
        <g className="labels">
            <text data-component="svg__label" data-label-id="s_24" className="label" font-size="724"><tspan dy="1em" x="4864" y="2788">FLOOR</tspan></text>
        </g>
    </svg>
);

export const Map2: React.FC<MapProps> = (props) => (
    <svg {...props} viewBox="0 0 10240 7680" style={{ ...props.style, backgroundImage: 'url("https://mapsapi.tmol.io/maps/geometry/image/22/98/229835?removeFilters=ISM_Shadow&avertaFonts=true&app=PRD2663_EDP_NA")' }}>
        <g className="seats"></g>
        <g className="polygons">
            <path data-component="svg__section" data-section-id="s_38" data-section-name="101" className="block is-available is-filtered minimum" d="M2994.65,1541.7C3718.3,1541.7 4441.95,1541.7 5165.6,1541.7C5165.6,1823.49 5165.6,2105.28 5165.6,2387.07C4441.95,2387.07 3718.3,2387.07 2994.65,2387.07L2994.65,2387.07C2994.65,2105.28 2994.65,1823.49 2994.65,1541.7z"></path>
            <path data-component="svg__section" data-section-id="s_37" data-section-name="102" className="block is-available is-filtered minimum" d="M5165.6,3232.47C4441.95,3232.47 3718.3,3232.47 2994.65,3232.47C2994.65,2950.68 2994.65,2668.89 2994.65,2387.1C3718.3,2387.1 4441.95,2387.1 5165.6,2387.1L5165.6,2387.1C5165.6,2668.89 5165.6,2950.68 5165.6,3232.47z"></path>
            <path data-component="svg__section" data-section-id="s_70" data-section-name="FLOOR TABLE 29" className="block is-ga" d="M5967.58,5167.139999999999C5885.53,5167.139999999999 5803.49,5167.139999999999 5721.45,5167.139999999999C5721.45,5094.82 5721.45,5010.8099999999995 5721.45,4938.5C5803.49,4938.5 5885.53,4938.5 5967.58,4938.5L5967.58,4938.5C5967.58,5010.8099999999995 5967.58,5094.82 5967.58,5167.139999999999z"></path>
            <path data-component="svg__section" data-section-id="s_34" data-section-name="105" className="block" d="M5165.6,5202.85C5165.6,5484.64 5165.6,5766.43 5165.6,6048.22C4441.95,6048.22 3718.3,6048.22 2994.65,6048.22C2994.65,5766.43 2994.65,5484.64 2994.65,5202.85L2994.65,5202.85C3718.3,5202.85 4441.95,5202.85 5165.6,5202.85z"></path>
            <path data-component="svg__section" data-section-id="s_33" data-section-name="205" className="block is-available is-filtered minimum" d="M7897.69,4770.2C7452.01,4772.31 7179.84,4773.08 7013.25,4773.02C7013.25,5016.64 7013.25,5260.37 7013.25,5504.08C6978.31,5549.49 6943.38,5594.89 6908.45,5640.29C7199.61,5871.85 7548.62,6146.7 7897.62,6421.55C7897.66,6274.96 7897.69,6128.38 7897.69,6100.33L7897.69,6100.33C7897.69,5656.91 7897.69,5213.52 7897.69,4770.2z"></path>
            <path data-component="svg__section" data-section-id="s_30" data-section-name="203" className="block is-available is-filtered minimum" d="M6911.15,1935.86C6945.17,1979.87 6979.2,2023.89 7013.22,2067.91C7013.22,2313.74 7013.22,2559.56 7013.22,2805.29C7177.54,2805.17 7448.09,2805.88 7897.66,2808.01C7897.66,2364.75 7897.66,1921.38 7897.66,1478C7897.66,1446.7 7897.63,1308.53 7897.59,1170.35L7897.59,1170.35C7550.22,1437.12 7202.84,1703.88 6911.15,1935.86z"></path>
            <path data-component="svg__section" data-section-id="s_32" data-section-name="201" className="block is-available is-filtered minimum" d="M4880.35,377.45C5265.43,477.719 5650.53,577.989 6035.62,678.259C5971.3,966.1500000000001 5906.99,1254.04 5842.67,1541.92C5457.58,1441.65 5072.49,1341.3799999999999 4687.4,1241.12L4687.4,1241.12C4751.72,953.2260000000001 4816.03,665.339 4880.35,377.45z"></path>
            <path data-component="svg__section" data-section-id="s_31" data-section-name="210" className="block" d="M7897.65,6421.46C7897.65,5978.05 7897.65,5362.1 7897.65,4918.78C7897.65,4869.23 7897.65,4819.69 7897.65,4770.15C8001.5,4771.33 8260.97,4771.36 8946.78,4768.25C8946.78,5261.08 8946.78,5926.55 8946.78,6419.56L8946.78,6419.56C8260.97,6422.67 8001.5,6422.64 7897.65,6421.46z"></path>
        </g>
        {/* Labels simplified for brevity, assume main ones */}
        <g className="labels">
            <text data-component="svg__label" className="label" font-size="248"><tspan dy="1em" x="4080" y="1825">101</tspan></text>
            <text data-component="svg__label" className="label" font-size="248"><tspan dy="1em" x="4080" y="2671">102</tspan></text>
        </g>
    </svg>
);

export const Map3: React.FC<MapProps> = (props) => (
    <svg {...props} viewBox="0 0 10240 7680" style={{ ...props.style, backgroundImage: 'url("https://mapsapi.tmol.io/maps/geometry/image/19/39/193942?removeFilters=ISM_Shadow&avertaFonts=true&app=PRD2663_EDP_NA")' }}>
        <g className="seats"></g>
        <g className="polygons">
            <path data-component="svg__section" data-section-id="s_37" data-section-name="BOX 16 - 3rd Floor" className="block is-available is-filtered minimum" d="M5805.1339963177725,6907.986940151262L5597.95,6268.064829670964L6079.286368623699,6112.25L6354.782213504478,6387.381987725092L6501.230053834107,6839.7124102708885L5805.1339963177725,6907.986940151262z"></path>
            <path data-component="svg__section" data-section-id="s_59" data-section-name="FLOOR RIGHT FRONT - 1st Floor" className="block is-available is-filtered minimum" d="M3005.46241200893,2606.2624120089304L3005.4,3261.999912580377L4132.3,3261.999912580377L4132.349999999999,2356.25L3149.8624120089303,2356.2624120089304z"></path>
            <path data-component="svg__section" data-section-id="s_39" data-section-name="BOX 5 - 2nd Floor" className="block is-available is-filtered minimum" d="M3444.9911501800484,6309.827061079407L3237.35,5668.514829670963L3718.6863686236984,5512.7L3994.1822135044786,5787.83198772509L4141.077878025724,6241.561860869693L3444.9911501800484,6309.827061079407z"></path>
            <path data-component="svg__section" data-section-id="s_50" data-section-name="TIER C RIGHT - 2nd Floor" className="block" d="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z"></path>
            <path data-component="svg__section" data-section-id="s_34" data-section-name="TIER D RIGHT - 3rd Floor" className="block is-available is-filtered minimum" d="M8557.133888052529,2267.95L8089.35,2578.823222389495L8344.80388805253,2970.54L8344.833888052528,3499.49L9011.013888052525,3499.49L9010.80388805253,2955.56z"></path>
            <path data-component="svg__section" data-section-id="s_56" data-section-name="BOX 9 - 3rd Floor" className="block is-available is-filtered minimum" d="M3444.9911501800484,541.35L3237.35,1182.662231408443L3718.6863686236984,1338.4770610794071L3994.1822135044786,1063.3450733543168L4141.077878025724,609.6152002097148L3444.9911501800484,541.35z"></path>
            <path data-component="svg__section" data-section-id="s_33" data-section-name="TIER D CENTER - 3rd Floor" className="block is-available is-filtered minimum" d="M8345.15,3500.7L8345.15,4164.6L9011.329999999998,4164.6L9011.329999999998,3500.7z"></path>
            <path data-component="svg__section" data-section-id="s_55" data-section-name="BOX 10 - 3rd Floor" className="block is-available is-filtered middle" d="M4231.570589730945,618.5L4024.2,1258.991220390477L4505.536368623698,1414.8060500614415L4781.032213504479,1139.6740623363512L4927.666647247281,686.7745298803732L4231.570589730945,618.5z"></path>
            <path data-component="svg__section" data-section-id="s_36" data-section-name="BOX 7 - 2nd Floor" className="block is-available is-filtered minimum" d="M5019.328919431546,6155.455676528513L4811.1,5512.314829670964L5292.436368623698,5356.5L5567.932213504479,5631.63198772509L5715.424976947881,6087.190476318799L5019.328919431546,6155.455676528513z"></path>
        </g>
        <g className="labels">
            <text data-component="svg__label" className="label" font-size="200"><tspan dy="1em" x="6017" y="6329">BOX 16</tspan></text>
            <text data-component="svg__label" className="label" font-size="200"><tspan dy="1em" x="3568" y="2470">FLOOR RIGHT</tspan></text>
        </g>
    </svg>
);

export const Map4: React.FC<MapProps> = (props) => (
    <svg {...props} viewBox="0 0 10240 7680" style={{ ...props.style, backgroundImage: 'url("https://mapsapi.tmol.io/maps/geometry/image/58/71/587124?removeFilters=ISM_Shadow&avertaFonts=true&app=PRD2663_EDP_NA")' }}>
        <g className="seats"></g>
        <g className="polygons">
            <path data-component="svg__section" data-section-id="s_27" data-section-name="MEZZANINE RIGHT" className="block is-available is-filtered middle" d="M7968.95,438.331L7968.95,438.331C7261.6,804.631,6554.25,1170.93,6554.25,1170.93C6554.25,1170.93,6760.67,1577.7,6760.71,1577.74C7013.22,1647.8,7216.01,1856.34,7216.01,1856.34C7363.63,2065.48,7465.83,2315.22,7536.47,2566.46C7536.47,2566.46,9405.65,2196.95,9405.65,2196.95C9173.44,1202.36,8822.01,538.195,8822.01,538.195L8822.01,538.195C8822.01,538.195,8395.48,488.263,7968.95,438.331Z"></path>
            <path data-component="svg__section" data-section-id="s_29" data-section-name="ORCHESTRA LEFT" className="block is-available is-filtered maximum" d="M2007.08,4414.58C1925.1,4804.0,1770.33,5142.47,1567.65,5391.4C1567.65,5391.4,3185.85,6318.22,4804.06,7245.03L4804.06,7245.03L5328.98,7245.12L5520.06,6908.33C5890.44,6908.33,6260.81,6908.33,6260.81,6908.33C6467.14,6443.11,6606.75,5976.1,6700.98,5547.5L6700.98,5547.5C6700.98,5547.5,4354.03,4981.04,2007.08,4414.58Z"></path>
            <path data-component="svg__section" data-section-id="s_28" data-section-name="ORCHESTRA CENTER" className="block is-available is-filtered middle" d="M6717.85,2080.58C4359.67,2594.81,2001.5,3109.03,2001.5,3109.03C2047.46,3317.88,2072.39,3541.8,2072.39,3774.75C2072.39,3998.11,2049.47,4213.17,2007.07,4414.6C2007.07,4414.6,6700.97,5547.52,6700.97,5547.52C6885.15,4709.83,6896.0,4018.87,6892.91,3774.74L6892.91,3774.74C6895.9,3538.29,6885.82,2882.69,6717.85,2080.58Z"></path>
            <path data-component="svg__section" data-section-id="s_24" data-section-name="ORCHESTRA RIGHT" className="block is-available is-filtered middle" d="M4804.02,432.515L4804.02,432.515C3185.83,1295.29,1567.65,2158.07,1567.65,2158.07C1765.83,2401.48,1918.21,2730.49,2001.51,3109.04C2001.51,3109.04,6717.86,2080.59,6717.86,2080.59C6623.67,1630.81,6479.83,1134.97,6260.82,641.145C6260.82,641.145,5890.44,641.145,5520.07,641.145L5520.07,641.145L5394.7,432.434L4804.02,432.515Z"></path>
            <path data-component="svg__section" data-section-id="s_30" data-section-name="MEZZANINE CENTER" className="block is-available is-filtered maximum" d="M9405.62,2196.93C8471.04,2381.69,7536.45,2566.45,7536.45,2566.45C7688.41,3106.9,7693.75,3654.3,7691.6,3819.48C7691.6,3819.48,7691.6,3869.63,7691.6,3869.63C7693.66,4027.74,7688.9,4536.06,7555.17,5053.28C7555.17,5053.28,9408.23,5480.98,9408.23,5480.98C9518.32,5006.43,9601.1,4457.32,9605.64,3869.63C9605.64,3861.26,9605.64,3827.85,9605.64,3819.48L9605.64,3819.48C9601.07,3227.16,9517.01,2674.03,9405.62,2196.93Z"></path>
            <path data-component="svg__section" data-section-id="s_31" data-section-name="MEZZANINE LEFT" className="block is-available is-filtered maximum" d="M7555.19,5053.28C7484.26,5327.59,7377.22,5604.4,7216.01,5832.79C7216.01,5832.79,7013.22,6041.32,6760.71,6111.39C6760.67,6111.42,6554.25,6518.2,6554.25,6518.2C6554.25,6518.2,7261.6,6884.5,7968.95,7250.8L7968.95,7250.8C8395.48,7200.87,8822.01,7150.94,8822.01,7150.94C8822.01,7150.94,9176.08,6481.78,9408.25,5480.98L9408.25,5480.98C9408.25,5480.98,8481.72,5267.13,7555.19,5053.28Z"></path>
        </g>
        <g className="labels">
            <text data-component="svg__label" className="label" font-size="248"><tspan dy="1em" x="8079" y="1224">MEZZANINE RIGHT</tspan></text>
            <text data-component="svg__label" className="label" font-size="248"><tspan dy="1em" x="4191" y="5476">ORCHESTRA LEFT</tspan></text>
        </g>
    </svg>
);

// Helper to generate a grid of seats
const generateSeats = (
    sectionId: string,
    startX: number,
    startY: number,
    rows: number,
    cols: number,
    rowGap: number,
    colGap: number,
    radius: number = 24
) => {
    const seats = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            seats.push(
                <circle
                    key={`${sectionId}-r${r}-c${c}`}
                    className="seat"
                    data-section={sectionId}
                    data-row={r + 1}
                    data-seat={c + 1}
                    cx={startX + c * colGap}
                    cy={startY + r * rowGap}
                    r={radius}
                />
            );
        }
    }
    return seats;
};

export const Map5: React.FC<MapProps> = (props) => (
    <svg {...props} viewBox="0 0 10240 7680" style={{ ...props.style, backgroundImage: 'url("https://mapsapi.tmol.io/maps/geometry/image/63/16/631664?removeFilters=ISM_Shadow&avertaFonts=true&app=PRD2663_EDP_NA")' }}>
        <g className="seats">
            {/* Section W - Left Block */}
            <g data-component="svg__block" data-section-name="SEC W" className="section">
                {generateSeats('W', 4050, 5100, 25, 12, 60, 55)}
            </g>

            {/* Section T - Right Block */}
            <g data-component="svg__block" data-section-name="SEC T" className="section">
                {generateSeats('T', 6250, 5100, 25, 12, 60, 55)}
            </g>

            {/* Section A - Top Block */}
            <g data-component="svg__block" data-section-name="SEC A" className="section">
                {generateSeats('A', 2180, 1000, 15, 6, 60, 55)}
            </g>
        </g>
        <g className="polygons" style={{ opacity: 0.1, pointerEvents: 'none' }}>
            {/* Dim the polygons so seats pop out, or remove them. Keeping for context but strictly background */}
            <path data-component="svg__section" data-section-id="s_37" data-section-name=" W" className="block" d="M4010.0,4996.65L4010.0,6844.98L4730.0,6844.98L4730.0,5131.66L4360.42,5131.64L4360.42,4996.65L4010.0,4996.65Z"></path>
            <path data-component="svg__section" data-section-id="s_157" data-section-name=" A" className="block" d="M2130.0,940.0L2130.0,1910.0L2195.0,1985.0L2517.5,1985.0L2517.5,940.0L2130.0,940.0Z"></path>
            <path data-component="svg__section" data-section-id="s_34" data-section-name=" T" className="block" d="M6196.65,4996.65L6196.65,6844.98L6916.65,6844.98L6916.65,4996.65L6196.65,4996.65Z"></path>
        </g>
        <g className="labels">
            <text data-component="svg__label" className="label" font-size="284"><tspan dy="1em" x="4369" y="5762">W</tspan></text>
            <text data-component="svg__label" className="label" font-size="284"><tspan dy="1em" x="2324" y="1266">A</tspan></text>
            <text data-component="svg__label" className="label" font-size="284"><tspan dy="1em" x="6556" y="5762">T</tspan></text>
        </g>
    </svg>
);

export const mapVariants = {
    1: Map1,
    2: Map2,
    3: Map3,
    4: Map4,
    5: Map5,
};
