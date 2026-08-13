export interface DeviceSpec {
  brand: string;
  modelName: string;
  modelIds: string[];
  ppi: number;
  resolution: {
    nativeWidth: number;
    nativeHeight: number;
  };
  activeDisplayMm: {
    width: number;
    height: number;
  };
  logicalDpiFallback: number;
}

/**
 * Generator function to mathematically guarantee precision for 
 * screen dimensions without manual rounding errors.
 * 1 inch = 25.4 mm
 */
const createDevice = (
  brand: string,
  modelName: string,
  modelIds: string[],
  ppi: number,
  nativeWidth: number,
  nativeHeight: number,
  logicalDpiFallback: number
): DeviceSpec => ({
  brand,
  modelName,
  modelIds,
  ppi,
  resolution: { nativeWidth, nativeHeight },
  activeDisplayMm: {
    width: (nativeWidth / ppi) * 25.4,
    height: (nativeHeight / ppi) * 25.4,
  },
  logicalDpiFallback,
});

export const deviceCatalog: DeviceSpec[] = [
  // --- APPLE (iOS) ---
  // iPhone 16 Series
  createDevice('Apple', 'iPhone 16 Pro Max', ['iPhone17,2', 'A3296', 'A3084', 'A3295', 'A3297'], 460, 1320, 2868, 460),
  createDevice('Apple', 'iPhone 16 Pro', ['iPhone17,1'], 460, 1206, 2622, 460),
  createDevice('Apple', 'iPhone 16 Plus', ['iPhone17,4', 'A3290', 'A3082', 'A3289', 'A3291'], 460, 1290, 2796, 460),
  createDevice('Apple', 'iPhone 16', ['iPhone17,3', 'A3287', 'A3081', 'A3286', 'A3288'], 460, 1179, 2556, 460),
  
  // iPhone 15 Series
  createDevice('Apple', 'iPhone 15 Pro Max', ['iPhone16,2'], 460, 1290, 2796, 460),
  createDevice('Apple', 'iPhone 15 Pro', ['iPhone16,1'], 460, 1179, 2556, 460),
  createDevice('Apple', 'iPhone 15 Plus', ['iPhone15,5'], 460, 1284, 2778, 460),
  createDevice('Apple', 'iPhone 15', ['iPhone15,4'], 460, 1170, 2532, 460),
  
  // iPhone 14 Series
  createDevice('Apple', 'iPhone 14 Pro Max', ['iPhone15,3'], 460, 1290, 2796, 460),
  createDevice('Apple', 'iPhone 14 Pro', ['iPhone15,2'], 460, 1179, 2556, 460),
  createDevice('Apple', 'iPhone 14 Plus', ['iPhone14,8'], 458, 1284, 2778, 458),
  createDevice('Apple', 'iPhone 14', ['iPhone14,7'], 460, 1170, 2532, 460),
  
  // iPhone 13 & 12 Series
  createDevice('Apple', 'iPhone 13 Pro Max', ['iPhone14,3'], 458, 1284, 2778, 458),
  createDevice('Apple', 'iPhone 13 Pro', ['iPhone14,2'], 460, 1170, 2532, 460),
  createDevice('Apple', 'iPhone 13', ['iPhone14,5'], 460, 1170, 2532, 460),
  createDevice('Apple', 'iPhone 13 mini', ['iPhone14,4'], 476, 1080, 2340, 476),
  createDevice('Apple', 'iPhone 12 Pro Max', ['iPhone13,4'], 458, 1284, 2778, 458),
  createDevice('Apple', 'iPhone 12 Pro', ['iPhone13,3'], 460, 1170, 2532, 460),
  createDevice('Apple', 'iPhone 12', ['iPhone13,2'], 460, 1170, 2532, 460),
  createDevice('Apple', 'iPhone 12 mini', ['iPhone13,1'], 476, 1080, 2340, 476),
  
  // Older & SE
  createDevice('Apple', 'iPhone 11 Pro Max', ['iPhone12,5'], 458, 1242, 2688, 458),
  createDevice('Apple', 'iPhone 11 Pro', ['iPhone12,3'], 458, 1125, 2436, 458),
  createDevice('Apple', 'iPhone 11', ['iPhone12,1'], 326, 828, 1792, 326),
  createDevice('Apple', 'iPhone SE (3rd Gen)', ['iPhone14,6'], 326, 750, 1334, 326),

  // --- SAMSUNG (Android) ---
  // Galaxy S Series
  createDevice('Samsung', 'Galaxy S25 Ultra', ['SM-S938B', 'SM-S938U', 'SM-S938U1', 'Galaxy S25 Ultra'], 498, 1440, 3120, 498),
  createDevice('Samsung', 'Galaxy S25+', ['SM-S936B', 'SM-S936U', 'Galaxy S25+'], 513, 1440, 3120, 513),
  createDevice('Samsung', 'Galaxy S25', ['SM-S931B', 'SM-S931U', 'Galaxy S25'], 416, 1080, 2340, 416),
  createDevice('Samsung', 'Galaxy S24 Ultra', ['SM-S928B', 'SM-S928U', 'SM-S928U1', 'SM-S928W', 'SM-S928N', 'SM-S9280'], 501, 1440, 3120, 501),
  createDevice('Samsung', 'Galaxy S24+', ['SM-S926B', 'SM-S926U', 'SM-S926U1'], 513, 1440, 3120, 513),
  createDevice('Samsung', 'Galaxy S24', ['SM-S921B', 'SM-S921U', 'SM-S921U1'], 416, 1080, 2340, 416),
  createDevice('Samsung', 'Galaxy S23 Ultra', ['SM-S918B', 'SM-S918U', 'SM-S918U1', 'SM-S918W', 'SM-S918N', 'SM-S9180'], 500, 1440, 3088, 500),
  createDevice('Samsung', 'Galaxy S23', ['SM-S911B', 'SM-S911U', 'SM-S911U1'], 425, 1080, 2340, 425),
  createDevice('Samsung', 'Galaxy S22 Ultra', ['SM-S908B', 'SM-S908U', 'SM-S908U1'], 500, 1440, 3088, 500),
  createDevice('Samsung', 'Galaxy S21 Ultra', ['SM-G998B', 'SM-G998U', 'SM-G998U1'], 515, 1440, 3200, 515),
  
  // Galaxy A Series (Massive global market share)
  createDevice('Samsung', 'Galaxy A55', ['SM-A556B', 'SM-A556E', 'SM-A556U'], 390, 1080, 2340, 390),
  createDevice('Samsung', 'Galaxy A54', ['SM-A546B', 'SM-A546E', 'SM-A546U'], 403, 1080, 2340, 403),
  createDevice('Samsung', 'Galaxy A35', ['SM-A356B', 'SM-A356E', 'SM-A356U'], 390, 1080, 2340, 390),
  createDevice('Samsung', 'Galaxy A34', ['SM-A346B', 'SM-A346E', 'SM-A346M'], 390, 1080, 2340, 390),

  // --- XIAOMI, POCO & REDMI (Android) ---
  createDevice('Xiaomi', 'Xiaomi 15T', ['Xiaomi 15T', '2407FPN8EG_15T'], 447, 1280, 2772, 447),
  createDevice('Xiaomi', 'Xiaomi 15', ['Xiaomi 15'], 460, 1200, 2670, 460),
  createDevice('Xiaomi', 'Xiaomi 14T Pro', ['2407FPN8EG', '2407FPN8ER', 'A402XM', 'XIG06'], 446, 1220, 2712, 446),
  createDevice('Xiaomi', 'Xiaomi 14T', ['2406APNFAG', 'XIG07'], 446, 1220, 2712, 446),
  createDevice('Xiaomi', 'Xiaomi 14 Pro', ['23116PN5BC', '23116PN5BG'], 522, 1440, 3200, 522),
  createDevice('Xiaomi', 'Xiaomi 14', ['23127PN0CC', '23127PN0CG'], 460, 1200, 2670, 460),
  
  // Poco Series
  createDevice('Poco', 'Poco F6 Pro', ['23113RKC6G', '23113RKC6C'], 526, 1440, 3200, 526),
  createDevice('Poco', 'Poco F6', ['24069PC21G', '24069PC21I'], 446, 1220, 2712, 446),
  createDevice('Poco', 'Poco X6 Pro', ['2311DRK48G', '2311DRK48I'], 446, 1220, 2712, 446),
  createDevice('Poco', 'Poco X6', ['23122PCD1G', '23122PCD1I'], 446, 1220, 2712, 446),
  createDevice('Poco', 'Poco F5 Pro', ['23013PC75G'], 526, 1440, 3200, 526),
  createDevice('Poco', 'Poco F5', ['23049PCD8G', '23049PCD8I'], 395, 1080, 2400, 395),

  // Redmi Note Series
  createDevice('Xiaomi', 'Redmi Note 13 Pro+', ['23090RA98G', '23090RA98I'], 446, 1220, 2712, 446),
  createDevice('Xiaomi', 'Redmi Note 13 Pro', ['2312CRAD3C', '2312DRA50G'], 446, 1220, 2712, 446),
  createDevice('Xiaomi', 'Redmi Note 13', ['2312DRAABG', '2312DRAABI'], 395, 1080, 2400, 395),

  // --- HUAWEI (Android) ---
  createDevice('Huawei', 'Mate 60 Pro', ['ALN-AL00', 'ALN-AL80'], 440, 1260, 2720, 440),
  createDevice('Huawei', 'Mate 60', ['BRA-AL00'], 439, 1216, 2688, 439),
  createDevice('Huawei', 'Pura 70 Ultra', ['HBP-AL00'], 460, 1260, 2844, 460),
  createDevice('Huawei', 'Pura 70 Pro', ['ALB-AL00'], 460, 1260, 2844, 460),
  createDevice('Huawei', 'P60 Pro', ['MNA-AL00', 'MNA-LX9'], 444, 1220, 2700, 444),
  createDevice('Huawei', 'Mate 50 Pro', ['DCO-AL00', 'DCO-LX9'], 428, 1212, 2616, 428),

  // --- HONOR (Android) ---
  createDevice('Honor', 'Magic6 Pro', ['BVL-AN16', 'BVL-N49'], 453, 1280, 2800, 453),
  createDevice('Honor', 'Magic5 Pro', ['PGT-AN10', 'PGT-N19'], 461, 1312, 2848, 461),
  createDevice('Honor', 'Honor 200 Pro', ['ELP-AN00', 'ELP-NX9'], 437, 1224, 2700, 437),
  createDevice('Honor', 'Honor 90', ['REA-AN00', 'REA-NX9'], 435, 1200, 2664, 435),

  // --- VIVO & iQOO (Android) ---
  createDevice('Vivo', 'X100 Pro', ['V2309A', 'V2324A'], 453, 1260, 2800, 453),
  createDevice('Vivo', 'X100', ['V2308A'], 453, 1260, 2800, 453),
  createDevice('Vivo', 'X90 Pro', ['V2241A', 'V2242A'], 453, 1260, 2800, 453),
  createDevice('Vivo', 'iQOO 12 Pro', ['V2329A'], 517, 1440, 3200, 517),
  createDevice('Vivo', 'iQOO 12', ['V2327A'], 453, 1260, 2800, 453),

  // --- GOOGLE PIXEL (Android) ---
  createDevice('Google', 'Pixel 9 Pro XL', ['Pixel 9 Pro XL'], 486, 1344, 2992, 486),
  createDevice('Google', 'Pixel 9 Pro', ['Pixel 9 Pro', 'GR83Y', 'GEC77', 'GWVK6'], 495, 1280, 2856, 495),
  createDevice('Google', 'Pixel 8 Pro', ['Pixel 8 Pro'], 489, 1344, 2992, 489),
  createDevice('Google', 'Pixel 8', ['Pixel 8'], 428, 1080, 2400, 428),
  createDevice('Google', 'Pixel 7 Pro', ['Pixel 7 Pro'], 512, 1440, 3120, 512),
  createDevice('Google', 'Pixel 7', ['Pixel 7'], 416, 1080, 2400, 416),
  createDevice('Google', 'Pixel 6 Pro', ['Pixel 6 Pro'], 512, 1440, 3120, 512),
  
  // --- ONEPLUS (Android) ---
  createDevice('OnePlus', 'OnePlus 12', ['CPH2573', 'CPH2581', 'CPH2583'], 510, 1440, 3168, 510),
  createDevice('OnePlus', 'OnePlus 12R', ['CPH2585', 'CPH2609'], 450, 1240, 2772, 450),
  createDevice('OnePlus', 'OnePlus 11', ['CPH2447', 'CPH2449', 'CPH2451'], 525, 1440, 3216, 525),
  createDevice('OnePlus', 'OnePlus Nord 3', ['CPH2491', 'CPH2493'], 450, 1240, 2772, 450),

  // --- MOTOROLA (Android) ---
  createDevice('Motorola', 'Edge 50 Pro', ['XT2403-1', 'XT2403-2'], 446, 1220, 2712, 446),
  createDevice('Motorola', 'Edge 40 Pro', ['XT2301-4'], 394, 1080, 2400, 394),
  createDevice('Motorola', 'Moto G84', ['XT2347-1', 'XT2347-2'], 402, 1080, 2400, 402),

  // --- SONY (Android - Note: High PPI) ---
  createDevice('Sony', 'Xperia 1 V', ['XQ-DQ54', 'XQ-DQ62', 'XQ-DQ72'], 643, 1644, 3840, 643),
  createDevice('Sony', 'Xperia 5 V', ['XQ-DE54', 'XQ-DE72'], 449, 1080, 2520, 449),
];