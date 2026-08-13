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
  
    // --- XIAOMI (Android) ---
    createDevice('Xiaomi', 'Xiaomi 15T', ['Xiaomi 15T', '2407FPN8EG_15T'], 447, 1280, 2772, 447),
    createDevice('Xiaomi', 'Xiaomi 15', ['Xiaomi 15'], 460, 1200, 2670, 460),
    createDevice('Xiaomi', 'Xiaomi 14T Pro', ['2407FPN8EG', '2407FPN8ER', 'A402XM', 'XIG06', 'Xiaomi 14T Pro'], 446, 1220, 2712, 446),
    createDevice('Xiaomi', 'Xiaomi 14T', ['2406APNFAG', 'XIG07', 'Xiaomi 14T'], 446, 1220, 2712, 446),
    createDevice('Xiaomi', 'Xiaomi 14 Pro', ['23116PN5BC', '23116PN5BG'], 522, 1440, 3200, 522),
    createDevice('Xiaomi', 'Xiaomi 14', ['23127PN0CC', '23127PN0CG'], 460, 1200, 2670, 460),
    
    // --- SAMSUNG (Android) ---
    // Galaxy S25 Series
    createDevice('Samsung', 'Galaxy S25 Ultra', ['SM-S938B', 'SM-S938U', 'SM-S938U1', 'Galaxy S25 Ultra'], 498, 1440, 3120, 498),
    createDevice('Samsung', 'Galaxy S25+', ['SM-S936B', 'SM-S936U', 'Galaxy S25+'], 513, 1440, 3120, 513),
    createDevice('Samsung', 'Galaxy S25', ['SM-S931B', 'SM-S931U', 'Galaxy S25'], 416, 1080, 2340, 416),
  
    // Galaxy S24 Series
    createDevice('Samsung', 'Galaxy S24 Ultra', ['SM-S928B', 'SM-S928U', 'SM-S928U1', 'SM-S928W', 'SM-S928N', 'SM-S9280'], 501, 1440, 3120, 501),
    createDevice('Samsung', 'Galaxy S24+', ['SM-S926B', 'SM-S926U', 'SM-S926U1'], 513, 1440, 3120, 513),
    createDevice('Samsung', 'Galaxy S24', ['SM-S921B', 'SM-S921U', 'SM-S921U1'], 416, 1080, 2340, 416),
    
    // Galaxy S23 Series
    createDevice('Samsung', 'Galaxy S23 Ultra', ['SM-S918B', 'SM-S918U', 'SM-S918U1', 'SM-S918W', 'SM-S918N', 'SM-S9180'], 500, 1440, 3088, 500),
    createDevice('Samsung', 'Galaxy S23', ['SM-S911B', 'SM-S911U', 'SM-S911U1'], 425, 1080, 2340, 425),
    
    // Legacy Ultra Flags
    createDevice('Samsung', 'Galaxy S22 Ultra', ['SM-S908B', 'SM-S908U', 'SM-S908U1'], 500, 1440, 3088, 500),
    createDevice('Samsung', 'Galaxy S21 Ultra', ['SM-G998B', 'SM-G998U', 'SM-G998U1'], 515, 1440, 3200, 515),
  
    // --- GOOGLE PIXEL (Android) ---
    // Pixel 9 Series
    createDevice('Google', 'Pixel 9 Pro XL', ['Pixel 9 Pro XL'], 486, 1344, 2992, 486),
    createDevice('Google', 'Pixel 9 Pro', ['Pixel 9 Pro', 'GR83Y', 'GEC77', 'GWVK6'], 495, 1280, 2856, 495),
  
    // Pixel 8 Series
    createDevice('Google', 'Pixel 8 Pro', ['Pixel 8 Pro'], 489, 1344, 2992, 489),
    createDevice('Google', 'Pixel 8', ['Pixel 8'], 428, 1080, 2400, 428),
    
    // Pixel 7 & 6 Series
    createDevice('Google', 'Pixel 7 Pro', ['Pixel 7 Pro'], 512, 1440, 3120, 512),
    createDevice('Google', 'Pixel 7', ['Pixel 7'], 416, 1080, 2400, 416),
    createDevice('Google', 'Pixel 6 Pro', ['Pixel 6 Pro'], 512, 1440, 3120, 512),
    
    // --- ONEPLUS (Android) ---
    createDevice('OnePlus', 'OnePlus 12', ['CPH2573', 'CPH2581', 'CPH2583'], 510, 1440, 3168, 510),
    createDevice('OnePlus', 'OnePlus 11', ['CPH2447', 'CPH2449', 'CPH2451'], 525, 1440, 3216, 525),
  ];