//https://stackoverflow.com/questions/19640055/multiple-markers-google-map-api-v3-from-array-of-addresses-and-avoid-over-query
//https://stackoverflow.com/questions/11792916/over-query-limit-in-google-maps-api-v3-how-do-i-pause-delay-in-javascript-to-sl

// Make variables globally available
var map, marker, myLat, myLng, myLatLng;

// Delay prevents flooding the maps api
var delay = 1000;

// Global variable to remind us what to do next
var nextAddress = 0;

// Cities and corresponding counts of missing children	
var allLocations = [
    { city: "ABILENE, TX", count: "2" },
    { city: "ADA, OK", count: "1" },
    { city: "AKRON, OH", count: "1" },
    { city: "ALAMOSA, CO", count: "1" },
    { city: "ALBANY, NY", count: "3" },
    { city: "ALBEMARLE, VA", count: "1" },
    { city: "ALBUQUERQUE, NM", count: "3" },
    { city: "ALDAN, PA", count: "1" },
    { city: "ALEXANDRIA, MN", count: "1" },
    { city: "ALEXANDRIA, VA", count: "10" },
    { city: "ALPHARETTA, GA", count: "1" },
    { city: "ALTON, IL", count: "1" },
    { city: "ALVIN, TX", count: "1" },
    { city: "ANCHORAGE, AK", count: "1" },
    { city: "ANDERSON, CA", count: "1" },
    { city: "ANDERSON, SC", count: "1" },
    { city: "ANTIOCH, TN", count: "1" },
    { city: "APPLETON, WI", count: "2" },
    { city: "ARECIBO, PR", count: "1" },
    { city: "ARLINGTON, MA", count: "8" },
    { city: "ARLINGTON, TX", count: "2" },
    { city: "ARLINGTON, VA", count: "1" },
    { city: "ASHEVILLE, NC", count: "2" },
    { city: "ASHLAND, KY", count: "1" },
    { city: "ATHENS, AL", count: "1" },
    { city: "ATHENS, GA", count: "1" },
    { city: "ATHENS, TX", count: "1" },
    { city: "ATLANTA, GA", count: "4" },
    { city: "ATTLEBORO, MA", count: "1" },
    { city: "AUBURN, WA", count: "1" },
    { city: "AUGUSTA, GA", count: "1" },
    { city: "AUGUSTA, VA", count: "1" },
    { city: "AURORA, CO", count: "9" },
    { city: "AURORA, IL", count: "1" },
    { city: "AUSTIN, TX", count: "5" },
    { city: "BAKERSFIELD, CA", count: "2" },
    { city: "BALA CYNWYD, PA", count: "1" },
    { city: "BALDWIN PARK, CA", count: "1" },
    { city: "BALTIMORE, MD", count: "3" },
    { city: "BARTLESVILLE, OK", count: "1" },
    { city: "BARTLETT, IL", count: "1" },
    { city: "BASILE, LA", count: "1" },
    { city: "BATAVIA, NY", count: "1" },
    { city: "BATON ROUGE, LA", count: "2" },
    { city: "BATTLE CREEK, MI", count: "1" },
    { city: "BAYPORT, NY", count: "1" },
    { city: "BEAUFORT, SC", count: "2" },
    { city: "BEEVILLE, TX", count: "2" },
    { city: "BELEN, NM", count: "2" },
    { city: "BELLEFONTAINE, OH", count: "1" },
    { city: "BELLEVILLE, IL", count: "1" },
    { city: "BELLFLOWER, CA", count: "1" },
    { city: "BELLINGHAM, WA", count: "1" },
    { city: "BENET LAKE, WI", count: "2" },
    { city: "BENSALEM, PA", count: "1" },
    { city: "BERLIN, MA", count: "1" },
    { city: "BIDDEFORD, ME", count: "1" },
    { city: "BIG SPRING, TX", count: "1" },
    { city: "BIRMINGHAM, AL", count: "1" },
    { city: "BLUE ISLAND, IL", count: "1" },
    { city: "BOKOSHE, OK", count: "1" },
    { city: "BOLIVAR, TN", count: "1" },
    { city: "BOSSIER CITY, LA", count: "1" },
    { city: "BOSTON, MA", count: "2" },
    { city: "BOWLING GREEN, KY", count: "1" },
    { city: "BOYS TOWN, NE", count: "7" },
    { city: "BRENTWOOD, NY", count: "2" },
    { city: "BRIARCLIFF MANOR, NY", count: "1" },
    { city: "BRIDGEWATER, NJ", count: "1" },
    { city: "BRIGHTON, MO", count: "1" },
    { city: "BROKEN ARROW, OK", count: "2" },
    { city: "BRONSTON, KY", count: "1" },
    { city: "BRONX, NY", count: "3" },
    { city: "BROOKINGS, OR", count: "1" },
    { city: "BROOKLYN, NY", count: "4" },
    { city: "BROOKSVILLE, FL", count: "2" },
    { city: "BROWNSTOWN, IN", count: "2" },
    { city: "BROWNSVILLE, TX", count: "1" },
    { city: "BUFFALO, NY", count: "1" },
    { city: "BULVERDE, TX", count: "2" },
    { city: "BURLINGTON, KY", count: "1" },
    { city: "BURNSVILLE, MN", count: "1" },
    { city: "CAMARILLO, CA", count: "2" },
    { city: "CAMBRIDGE SPRINGS, PA", count: "1" },
    { city: "CAMBRIDGE, OH", count: "1" },
    { city: "CAMDEN, NJ", count: "1" },
    { city: "CAMP SPRINGS, MD", count: "1" },
    { city: "CANON CITY, CO", count: "1" },
    { city: "CANTON, OH", count: "2" },
    { city: "CAROLINA, PR", count: "1" },
    { city: "CARROLLTON, GA", count: "1" },
    { city: "CARROLLTON, MS", count: "1" },
    { city: "CARSON, CA", count: "1" },
    { city: "CATHEDRAL CITY, CA", count: "1" },
    { city: "CEDAR HILL, TX", count: "1" },
    { city: "CEDAR PARK, TX", count: "1" },
    { city: "CENTENNIAL, CO", count: "1" },
    { city: "CENTREVILLE, VA", count: "2" },
    { city: "CHAMBERSBURG, PA", count: "1" },
    { city: "CHANNELVIEW, TX", count: "1" },
    { city: "CHARLESTOWN, MA", count: "1" },
    { city: "CHARLOTTE, NC", count: "1" },
    { city: "CHARLOTTESVILLE, VA", count: "1" },
    { city: "CHELSEA, MA", count: "2" },
    { city: "CHESAPEAKE, VA", count: "2" },
    { city: "CHESTER, VA", count: "1" },
    { city: "CHESTERFIELD, VA", count: "11" },
    { city: "CHICAGO HEIGHTS, IL", count: "1" },
    { city: "CHICAGO, IL", count: "18" },
    { city: "CHIEFLAND, FL", count: "1" },
    { city: "CHINO, CA", count: "1" },
    { city: "CINCINNATI, OH", count: "2" },
    { city: "CITRA, FL", count: "1" },
    { city: "CLARKSON, KY", count: "2" },
    { city: "CLEARLAKE, CA", count: "1" },
    { city: "CLEARWATER, FL", count: "2" },
    { city: "CLEBURNE, TX", count: "1" },
    { city: "CLEVELAND, OH", count: "4" },
    { city: "CLEVELAND, TN", count: "1" },
    { city: "CLINTON TOWNSHIP, MI", count: "1" },
    { city: "CLINTON, MO", count: "1" },
    { city: "CLIO, MI", count: "1" },
    { city: "CLOVIS, NM", count: "1" },
    { city: "COATESVILLE, PA", count: "1" },
    { city: "COCOA, FL", count: "1" },
    { city: "COCONUT CREEK, FL", count: "1" },
    { city: "COLORADO SPRINGS, CO", count: "6" },
    { city: "COLUMBIA, SC", count: "1" },
    { city: "COLUMBUS, GA", count: "2" },
    { city: "COLUMBUS, OH", count: "29" },
    { city: "COMMERCE, TX", count: "1" },
    { city: "CONCORD, CA", count: "1" },
    { city: "CONCORD, NC", count: "1" },
    { city: "CONWAY, AR", count: "2" },
    { city: "COPE, SC", count: "1" },
    { city: "CORONA, CA", count: "2" },
    { city: "COSHOCTON, OH", count: "1" },
    { city: "COUNCIL GROVE, KS", count: "1" },
    { city: "COUNTRY CLUB HILLS, IL", count: "1" },
    { city: "CRAMERTON, NC", count: "2" },
    { city: "CRAWFORDSVILLE, IN", count: "1" },
    { city: "CROWN POINT, IN", count: "1" },
    { city: "CUBA, IL", count: "1" },
    { city: "CULPEPER, VA", count: "1" },
    { city: "CUTLER BAY, FL", count: "4" },
    { city: "DADE CITY, FL", count: "2" },
    { city: "DALLAS, TX", count: "5" },
    { city: "DANVILLE, VA", count: "2" },
    { city: "DAVIE, FL", count: "2" },
    { city: "DAYTON, OH", count: "4" },
    { city: "DECATUR, GA", count: "2" },
    { city: "DECATUR, IL", count: "1" },
    { city: "DELAND, FL", count: "1" },
    { city: "DELTONA, FL", count: "2" },
    { city: "DENTON, TX", count: "1" },
    { city: "DENVER, CO", count: "11" },
    { city: "DERBY, KS", count: "1" },
    { city: "DESOTO, TX", count: "2" },
    { city: "DETROIT, MI", count: "7" },
    { city: "DINWIDDIE, VA", count: "1" },
    { city: "DOBBS FERRY, NY", count: "1" },
    { city: "DOLTON, IL", count: "2" },
    { city: "DOVER, FL", count: "1" },
    { city: "DOWELLTOWN, TN", count: "1" },
    { city: "DOWNERS GROVE, IL", count: "1" },
    { city: "DOWNEY, CA", count: "1" },
    { city: "DREXEL HILL, PA", count: "1" },
    { city: "DULUTH, MN", count: "1" },
    { city: "EAST LOS ANGELES, CA", count: "2" },
    { city: "EASTON, PA", count: "2" },
    { city: "EDINBURG, TX", count: "1" },
    { city: "EDWARDS, MS", count: "1" },
    { city: "EL PASO, TX", count: "4" },
    { city: "EL SEGUNDO, CA", count: "1" },
    { city: "ELGIN, TX", count: "1" },
    { city: "ELK GROVE, CA", count: "4" },
    { city: "ELMA, WA", count: "1" },
    { city: "ELMIRA, NY", count: "1" },
    { city: "EMORY, TX", count: "1" },
    { city: "ERIE, PA", count: "1" },
    { city: "ESSEX, MD", count: "1" },
    { city: "EUGENE, OR", count: "1" },
    { city: "EVERETT, MA", count: "1" },
    { city: "FAIRFAX, VA", count: "17" },
    { city: "FALL RIVER, MA", count: "3" },
    { city: "FALLS CHURCH, VA", count: "1" },
    { city: "FARGO, ND", count: "1" },
    { city: "FARMINGTON, NM", count: "1" },
    { city: "FEDERAL WAY, WA", count: "2" },
    { city: "FINDLAY, OH", count: "2" },
    { city: "FITCHBURG, MA", count: "2" },
    { city: "FLINT, MI", count: "1" },
    { city: "FLORENCE, SC", count: "1" },
    { city: "FLORIDA CITY, FL", count: "1" },
    { city: "FORT COLLINS, CO", count: "2" },
    { city: "FORT LAUDERDALE, FL", count: "14" },
    { city: "FORT MYERS, FL", count: "8" },
    { city: "FORT WORTH, TX", count: "6" },
    { city: "FRAMINGHAM, MA", count: "1" },
    { city: "FRANKLINTON, LA", count: "1" },
    { city: "FREDERICK, MD", count: "1" },
    { city: "FREEPORT, IL", count: "1" },
    { city: "FRESNO, CA", count: "1" },
    { city: "FULLERTON, CA", count: "1" },
    { city: "GADSDEN, SC", count: "1" },
    { city: "GAINESVILLE, FL", count: "2" },
    { city: "GALESBURG, IL", count: "1" },
    { city: "GALVESTON, TX", count: "1" },
    { city: "GARY, IN", count: "5" },
    { city: "GASTONIA, NC", count: "2" },
    { city: "GERMANTOWN, MD", count: "2" },
    { city: "GILLETTE, WY", count: "1" },
    { city: "GLENDALE, AZ", count: "2" },
    { city: "GLOBE, AZ", count: "1" },
    { city: "GOSPORT, IN", count: "1" },
    { city: "GRANADA HILLS, CA", count: "1" },
    { city: "GRAND ISLAND, NE", count: "1" },
    { city: "GRAND ISLAND, NY", count: "1" },
    { city: "GRAND JUNCTION, CO", count: "1" },
    { city: "GRAND RAPIDS, MI", count: "1" },
    { city: "GRANDVIEW, MO", count: "1" },
    { city: "GRANTS PASS, OR", count: "1" },
    { city: "GREEN BAY, WI", count: "1" },
    { city: "GREENSBORO, NC", count: "3" },
    { city: "GREENVILLE, SC", count: "1" },
    { city: "GRENADA, MS", count: "1" },
    { city: "GRESHAM, OR", count: "2" },
    { city: "GROVE CITY, OH", count: "2" },
    { city: "GWINN, MI", count: "1" },
    { city: "HAGERSTOWN, MD", count: "2" },
    { city: "HAMILTON, OH", count: "4" },
    { city: "HAMPTON, GA", count: "1" },
    { city: "HAMPTON, VA", count: "21" },
    { city: "HARLINGEN, TX", count: "1" },
    { city: "HASTINGS ON HUDSON, NY", count: "1" },
    { city: "HASTINGS-ON-HUDSON, NY", count: "1" },
    { city: "HASTINGS, FL", count: "1" },
    { city: "HASTINGS, MN", count: "1" },
    { city: "HAVERHILL, MA", count: "3" },
    { city: "HAWAIIAN GARDENS, CA", count: "1" },
    { city: "HAWTHORNE, NY", count: "2" },
    { city: "HEBER SPRINGS, AR", count: "1" },
    { city: "HEMPSTEAD, NY", count: "1" },
    { city: "HENDERSONVILLE, NC", count: "1" },
    { city: "HENRICO, VA", count: "7" },
    { city: "HIALEAH, FL", count: "4" },
    { city: "HIGH POINT, NC", count: "1" },
    { city: "HOLDENVILLE, OK", count: "1" },
    { city: "HOLLIDAYSBURG, PA", count: "1" },
    { city: "HOMESTEAD, FL", count: "5" },
    { city: "HONESDALE, PA", count: "1" },
    { city: "HOOPESTON, IL", count: "1" },
    { city: "HOPE, IN", count: "1" },
    { city: "HOQUIAM, WA", count: "1" },
    { city: "HOT SPRINGS NATIONAL PARK, AR", count: "3" },
    { city: "HOUSTON, TX", count: "21" },
    { city: "HUDSONVILLE, MI", count: "1" },
    { city: "HUNTINGTON PARK, CA", count: "1" },
    { city: "HUNTLAND, TN", count: "1" },
    { city: "HUNTSVILLE, AL", count: "1" },
    { city: "HYATTSVILLE, MD", count: "1" },
    { city: "IDABEL, OK", count: "1" },
    { city: "IDAHO FALLS, ID", count: "1" },
    { city: "INDIAN ORCHARD, MA", count: "1" },
    { city: "INDIAN ROCKS BEACH, FL", count: "1" },
    { city: "INDIANAPOLIS, IN", count: "14" },
    { city: "INMAN, SC", count: "1" },
    { city: "JACKSONVILLE, AR", count: "1" },
    { city: "JACKSONVILLE, FL", count: "3" },
    { city: "JACKSONVILLE, NC", count: "2" },
    { city: "JAMAICA, NY", count: "1" },
    { city: "JEFFERSON CITY, MO", count: "1" },
    { city: "JENKS, OK", count: "1" },
    { city: "JONES, OK", count: "1" },
    { city: "JONESBORO, AR", count: "1" },
    { city: "KALAMAZOO, MI", count: "1" },
    { city: "KANKAKEE, IL", count: "1" },
    { city: "KANSAS CITY, KS", count: "2" },
    { city: "KANSAS CITY, MO", count: "2" },
    { city: "KEANSBURG, NJ", count: "1" },
    { city: "KEITHVILLE, LA", count: "1" },
    { city: "KELSO, WA", count: "1" },
    { city: "KENNEWICK, WA", count: "1" },
    { city: "KILLEEN, TX", count: "1" },
    { city: "KINDERHOOK, NY", count: "1" },
    { city: "KINGMAN, AZ", count: "1" },
    { city: "KINGSPORT, TN", count: "1" },
    { city: "KIRKLAND, WA", count: "1" },
    { city: "KLAMATH FALLS, OR", count: "1" },
    { city: "KNOXVILLE, TN", count: "2" },
    { city: "KOKOMO, IN", count: "1" },
    { city: "LA VERNE, CA", count: "7" },
    { city: "LACONIA, NH", count: "1" },
    { city: "LAGRANGE, GA", count: "1" },
    { city: "LAKE ARIEL, PA", count: "1" },
    { city: "LAKE STEVENS, WA", count: "1" },
    { city: "LAKE VILLA, IL", count: "1" },
    { city: "LAKELAND, FL", count: "2" },
    { city: "LAKEWOOD, CO", count: "1" },
    { city: "LANCASTER, OH", count: "2" },
    { city: "LANCASTER, SC", count: "1" },
    { city: "LAREDO, TX", count: "3" },
    { city: "LARGO, FL", count: "2" },
    { city: "LAS CRUCES, NM", count: "1" },
    { city: "LAS VEGAS, NV", count: "13" },
    { city: "LATROBE, PA", count: "1" },
    { city: "LAUDERHILL, FL", count: "1" },
    { city: "LAUREL, MS", count: "1" },
    { city: "LAWTON, OK", count: "2" },
    { city: "LEBANON, IN", count: "2" },
    { city: "LEESBURG, VA", count: "4" },
    { city: "LEITCHFIELD, KY", count: "2" },
    { city: "LEWISTON, ID", count: "1" },
    { city: "LEXINGTON, SC", count: "1" },
    { city: "LIMA, OH", count: "1" },
    { city: "LINCOLN, NE", count: "1" },
    { city: "LITHONIA, GA", count: "1" },
    { city: "LITTLE ROCK, AR", count: "2" },
    { city: "LIVE OAK, FL", count: "1" },
    { city: "LOCKPORT, NY", count: "1" },
    { city: "LOGANVILLE, GA", count: "1" },
    { city: "LOMETA, TX", count: "1" },
    { city: "LOMITA, CA", count: "1" },
    { city: "LONDON, KY", count: "1" },
    { city: "LONG BEACH, CA", count: "4" },
    { city: "LONOKE, AR", count: "1" },
    { city: "LORAIN, OH", count: "2" },
    { city: "LOS ANGELES, CA", count: "22" },
    { city: "LOUISVILLE, KY", count: "3" },
    { city: "LOWELL, MA", count: "3" },
    { city: "LUBBOCK, TX", count: "1" },
    { city: "LUDOWICI, GA", count: "1" },
    { city: "LYNCHBURG, VA", count: "1" },
    { city: "LYNN, MA", count: "1" },
    { city: "LYNWOOD, IL", count: "1" },
    { city: "MABLETON, GA", count: "1" },
    { city: "MACON, GA", count: "2" },
    { city: "MAKAYLA, TX", count: "1" },
    { city: "MANASSAS, VA", count: "17" },
    { city: "MANCHESTER, NH", count: "1" },
    { city: "MANSFIELD, OH", count: "1" },
    { city: "MAPLE HEIGHTS, OH", count: "1" },
    { city: "MARYSVILLE, OH", count: "1" },
    { city: "MASSILLON, OH", count: "1" },
    { city: "MATTAWAN, MI", count: "1" },
    { city: "MAYWOOD, IL", count: "1" },
    { city: "MCKEESPORT, PA", count: "1" },
    { city: "MCMINNVILLE, TN", count: "1" },
    { city: "MECHANICSBURG, PA", count: "1" },
    { city: "MELBOURNE, FL", count: "1" },
    { city: "MEMPHIS, TN", count: "3" },
    { city: "MERIDEN, CT", count: "1" },
    { city: "MERIDIAN, MS", count: "1" },
    { city: "MIAMI GARDENS, FL", count: "1" },
    { city: "MIAMI, FL", count: "17" },
    { city: "MICHIGAN CITY, IN", count: "1" },
    { city: "MIDDLEBURG, FL", count: "1" },
    { city: "MIDDLETON, TN", count: "1" },
    { city: "MILAN, TN", count: "1" },
    { city: "MILLERSPORT, OH", count: "1" },
    { city: "MILWAUKEE, WI", count: "6" },
    { city: "MINNEAPOLIS, MN", count: "3" },
    { city: "MISSION HILLS, CA", count: "2" },
    { city: "MODESTO, CA", count: "1" },
    { city: "MONTGOMERY VILLAGE, MD", count: "2" },
    { city: "MONTOURSVILLE, PA", count: "1" },
    { city: "MORENO VALLEY, CA", count: "1" },
    { city: "MORRIS, AL", count: "1" },
    { city: "MOSINEE, WI", count: "1" },
    { city: "MOUNT VERNON, IL", count: "1" },
    { city: "MOUNT VERNON, MO", count: "1" },
    { city: "MOUNTAIN HOME, AR", count: "1" },
    { city: "MUNCIE, IN", count: "1" },
    { city: "MURPHY, NC", count: "1" },
    { city: "MUSKEGON, MI", count: "1" },
    { city: "NANUET, NY", count: "1" },
    { city: "NAPERVILLE, IL", count: "1" },
    { city: "NAPLES, FL", count: "1" },
    { city: "NASHVILLE, TN", count: "3" },
    { city: "NATICK, MA", count: "1" },
    { city: "NEOSHO, MO", count: "1" },
    { city: "NEW BEDFORD, MA", count: "1" },
    { city: "NEW BRITAIN, CT", count: "1" },
    { city: "NEW GALILEE, PA", count: "1" },
    { city: "NEW HAVEN, CT", count: "1" },
    { city: "NEW IBERIA, LA", count: "1" },
    { city: "NEW ORLEANS, LA", count: "3" },
    { city: "NEW PHILADELPHIA, OH", count: "1" },
    { city: "NEW YORK, NY", count: "3" },
    { city: "NEWPORT NEWS, VA", count: "8" },
    { city: "NIAGARA FALLS, NY", count: "1" },
    { city: "NOBLE, OK", count: "1" },
    { city: "NORFOLK, NE", count: "1" },
    { city: "NORFOLK, VA", count: "33" },
    { city: "NORMAN, OK", count: "1" },
    { city: "NORTH ADAMS, MA", count: "1" },
    { city: "NORTH BERGEN, NJ", count: "1" },
    { city: "NORTH CHARLESTON, SC", count: "1" },
    { city: "NORTH CHICAGO, IL", count: "1" },
    { city: "NORTH EAST, MD", count: "1" },
    { city: "NORTH FORT MYERS, FL", count: "1" },
    { city: "NORTH HILLS, CA", count: "12" },
    { city: "NORTH LAS VEGAS, NV", count: "4" },
    { city: "NORTH LITTLE ROCK, AR", count: "1" },
    { city: "NORTH MIAMI, FL", count: "1" },
    { city: "NORTH OLMSTED, OH", count: "1" },
    { city: "NORTH VERNON, IN", count: "1" },
    { city: "NORTH, SC", count: "1" },
    { city: "NORTHRIDGE, CA", count: "1" },
    { city: "NOTTINGHAM, MD", count: "1" },
    { city: "O FALLON, IL", count: "1" },
    { city: "OAK CITY, NC", count: "1" },
    { city: "OCEANSIDE, CA", count: "1" },
    { city: "OCKLAWAHA, FL", count: "1" },
    { city: "OKLAHOMA CITY, OK", count: "6" },
    { city: "OLATHE, KS", count: "3" },
    { city: "OLD HICKORY, TN", count: "1" },
    { city: "OLIVE BRANCH, MS", count: "1" },
    { city: "OMAHA, NE", count: "7" },
    { city: "ONTARIO, CA", count: "1" },
    { city: "ORANGE PARK, FL", count: "2" },
    { city: "ORANGEBURG, SC", count: "1" },
    { city: "ORLANDO, FL", count: "3" },
    { city: "OSAGE BEACH, MO", count: "1" },
    { city: "OXNARD, CA", count: "2" },
    { city: "PACOIMA, CA", count: "4" },
    { city: "PAINESVILLE, OH", count: "1" },
    { city: "PALM BEACH GARDENS, FL", count: "1" },
    { city: "PALMDALE, CA", count: "1" },
    { city: "PALMYRA, VA", count: "1" },
    { city: "PANAMA CITY, FL", count: "2" },
    { city: "PANORAMA CITY, CA", count: "5" },
    { city: "PASADENA, TX", count: "1" },
    { city: "PAULDING, OH", count: "1" },
    { city: "PENSACOLA, FL", count: "1" },
    { city: "PEORIA, IL", count: "3" },
    { city: "PERRYSVILLE, IN", count: "1" },
    { city: "PERRYSVILLE, OH", count: "3" },
    { city: "PHILADELPHIA, PA", count: "8" },
    { city: "PHOENIX, AZ", count: "6" },
    { city: "PHOENIXVILLE, PA", count: "1" },
    { city: "PICKERINGTON, OH", count: "1" },
    { city: "PINE BLUFF, AR", count: "1" },
    { city: "PINSON, TN", count: "1" },
    { city: "PITTSBURGH, PA", count: "3" },
    { city: "PLANO, TX", count: "1" },
    { city: "PLANT CITY, FL", count: "1" },
    { city: "PLEASANTVILLE, NY", count: "2" },
    { city: "POMONA, CA", count: "1" },
    { city: "POMPANO BEACH, FL", count: "2" },
    { city: "PORT CHARLOTTE, FL", count: "1" },
    { city: "PORT HURON, MI", count: "1" },
    { city: "PORTLAND, OR", count: "3" },
    { city: "PORTSMOUTH, VA", count: "7" },
    { city: "POUGHKEEPSIE, NY", count: "3" },
    { city: "PRINCE GEORGE, VA", count: "1" },
    { city: "PUEBLO, CO", count: "2" },
    { city: "PUNTA GORDA, FL", count: "1" },
    { city: "PURCELLVILLE, VA", count: "1" },
    { city: "QUEEN CREEK, AZ", count: "1" },
    { city: "RAYMONDVILLE, TX", count: "1" },
    { city: "RAYVILLE, LA", count: "2" },
    { city: "REDFORD, MI", count: "2" },
    { city: "RENO, NV", count: "6" },
    { city: "REYNOLDSBURG, OH", count: "2" },
    { city: "RICHMOND, TX", count: "1" },
    { city: "RICHMOND, VA", count: "6" },
    { city: "RIO RANCHO, NM", count: "1" },
    { city: "RITTMAN, OH", count: "1" },
    { city: "RIVERSIDE, CA", count: "4" },
    { city: "RIVERVIEW, FL", count: "1" },
    { city: "ROANOKE, VA", count: "6" },
    { city: "ROCHESTER, NY", count: "7" },
    { city: "ROCKFORD, IL", count: "3" },
    { city: "ROCKVILLE, MD", count: "1" },
    { city: "ROGERSVILLE, TN", count: "1" },
    { city: "RONKONKOMA, NY", count: "1" },
    { city: "ROSWELL, NM", count: "1" },
    { city: "ROYAL PALM BEACH, FL", count: "1" },
    { city: "RUSK, TX", count: "1" },
    { city: "SACRAMENTO, CA", count: "4" },
    { city: "SAGINAW, MI", count: "1" },
    { city: "SAINT GEORGE, UT", count: "2" },
    { city: "SAINT PAUL, MN", count: "1" },
    { city: "SAINT PETERSBURG, FL", count: "3" },
    { city: "SAINT THOMAS, VI", count: "2" },
    { city: "SALEM, MA", count: "3" },
    { city: "SALEM, OR", count: "2" },
    { city: "SALIDA, CA", count: "1" },
    { city: "SALISBURY, MD", count: "1" },
    { city: "SALT LAKE CITY, UT", count: "2" },
    { city: "SAN ANTONIO, TX", count: "13" },
    { city: "SAN DIEGO, CA", count: "1" },
    { city: "SAN JOSE, CA", count: "1" },
    { city: "SAN MARCOS, TX", count: "1" },
    { city: "SAN PEDRO, CA", count: "1" },
    { city: "SAN RAMON, CA", count: "1" },
    { city: "SAND SPRINGS, OK", count: "1" },
    { city: "SANFORD, FL", count: "1" },
    { city: "SANTA FE, NM", count: "1" },
    { city: "SANTA ROSA, CA", count: "1" },
    { city: "SANTA ROSA, NM", count: "1" },
    { city: "SAUCIER, MS", count: "1" },
    { city: "SCHENECTADY, NY", count: "5" },
    { city: "SCOTTSVILLE, KY", count: "2" },
    { city: "SEARCY, AR", count: "1" },
    { city: "SEATTLE, WA", count: "7" },
    { city: "SEVIERVILLE, TN", count: "1" },
    { city: "SHAMOKIN, PA", count: "1" },
    { city: "SHAWNEE, KS", count: "1" },
    { city: "SHAWNEE, OK", count: "1" },
    { city: "SHELTON, WA", count: "1" },
    { city: "SHERMAN, TX", count: "1" },
    { city: "SILVER SPRING, MD", count: "3" },
    { city: "SIMI VALLEY, CA", count: "1" },
    { city: "SINTON, TX", count: "1" },
    { city: "SOMERSET, TX", count: "1" },
    { city: "SOUTH BEND, IN", count: "2" },
    { city: "SOUTH DAYTONA, FL", count: "1" },
    { city: "SPARKS, NV", count: "1" },
    { city: "SPOKANE, WA", count: "2" },
    { city: "SPOTSYLVANIA, VA", count: "1" },
    { city: "SPRING VALLEY, NY", count: "1" },
    { city: "SPRING, TX", count: "3" },
    { city: "SPRINGFIELD, KY", count: "1" },
    { city: "SPRINGFIELD, MA", count: "5" },
    { city: "SPRINGFIELD, MO", count: "2" },
    { city: "SPRINGFIELD, OH", count: "1" },
    { city: "ST CLOUD, FL", count: "1" },
    { city: "ST PETERSBURG, FL", count: "1" },
    { city: "ST. CLOUD, MN", count: "1" },
    { city: "ST. PETERSBURG, FL", count: "1" },
    { city: "STAATSBURG, NY", count: "1" },
    { city: "STATESVILLE, NC", count: "1" },
    { city: "STOCKTON, CA", count: "1" },
    { city: "STONE MOUNTAIN, GA", count: "1" },
    { city: "STONEHAM, MA", count: "1" },
    { city: "STONY BROOK, NY", count: "1" },
    { city: "SUDBURY, MA", count: "1" },
    { city: "SUFFOLK, VA", count: "1" },
    { city: "SUGAR LAND, TX", count: "1" },
    { city: "SULLIVAN, MO", count: "1" },
    { city: "SUN VALLEY, NV", count: "1" },
    { city: "SUNRISE, FL", count: "1" },
    { city: "SURPRISE, AZ", count: "1" },
    { city: "SYLMAR, CA", count: "4" },
    { city: "SYOSSET, NY", count: "2" },
    { city: "SYOSSETT, NY", count: "1" },
    { city: "SYRACUSE, NY", count: "1" },
    { city: "TALLAHASSEE, FL", count: "1" },
    { city: "TAMPA, FL", count: "11" },
    { city: "TEMPLE TERRACE, FL", count: "1" },
    { city: "THOUSAND OAKS, CA", count: "1" },
    { city: "TIPTON, OK", count: "1" },
    { city: "TOLEDO, OH", count: "3" },
    { city: "TOMBALL, TX", count: "1" },
    { city: "TOWER HILL, IL", count: "1" },
    { city: "TRENTON, NJ", count: "1" },
    { city: "TUCSON, AZ", count: "2" },
    { city: "TULSA, OK", count: "7" },
    { city: "TURLOCK, CA", count: "1" },
    { city: "UPPER DARBY, PA", count: "1" },
    { city: "UPPER MARLBORO, MD", count: "1" },
    { city: "URBANA, IL", count: "1" },
    { city: "VALATIE, NY", count: "1" },
    { city: "VAN NUYS, CA", count: "3" },
    { city: "VANCOUVER, WA", count: "3" },
    { city: "VERO BEACH, FL", count: "1" },
    { city: "VIRGINIA BEACH, VA", count: "34" },
    { city: "VISALIA, CA", count: "4" },
    { city: "VISTA, CA", count: "2" },
    { city: "WACO, TX", count: "3" },
    { city: "WALLA WALLA, WA", count: "1" },
    { city: "WALLER, TX", count: "1" },
    { city: "WARREN, OH", count: "2" },
    { city: "WASHINGTON, DC", count: "1" },
    { city: "WATERTOWN, MA", count: "1" },
    { city: "WAUKEGAN, IL", count: "2" },
    { city: "WAUWATOSA, WI", count: "1" },
    { city: "WEST COVINA, CA", count: "2" },
    { city: "WEST HARTFORD, CT", count: "1" },
    { city: "WEST PALM BEACH, FL", count: "4" },
    { city: "WESTFIR, OR", count: "2" },
    { city: "WESTLAND, MI", count: "1" },
    { city: "WHEATFIELD, IN", count: "1" },
    { city: "WHEATON, MD", count: "1" },
    { city: "WHITE HALL, OH", count: "1" },
    { city: "WHITE PLAINS, NY", count: "1" },
    { city: "WICHITA, KS", count: "1" },
    { city: "WILLIAMSPORT, PA", count: "1" },
    { city: "WILLIAMSTOWN, NJ", count: "1" },
    { city: "WILLINGBORO, NJ", count: "1" },
    { city: "WILLIS, TX", count: "1" },
    { city: "WINCHESTER, VA", count: "1" },
    { city: "WINDSOR, CT", count: "1" },
    { city: "WINNETKA, CA", count: "1" },
    { city: "WINSTON-SALEM, NC", count: "1" },
    { city: "WINTER HAVEN, FL", count: "2" },
    { city: "WINTER PARK, FL", count: "1" },
    { city: "WINTER SPRINGS, FL", count: "1" },
    { city: "WOODLAND HILLS, CA", count: "2" },
    { city: "WORCESTER, MA", count: "6" },
    { city: "WYTHEVILLE, VA", count: "1" },
    { city: "YAKIMA, WA", count: "3" },
    { city: "YONKERS, NY", count: "1" },
    { city: "YORK, PA", count: "1" },
    { city: "YORKTOWN, VA", count: "1" },
    { city: "YOUNGSTOWN, OH", count: "2" },
    { city: "YUBA CITY, CA", count: "1" },
    { city: "YUCCA VALLEY, CA", count: "2" },
    { city: "YUKON, OK", count: "1" }
];

// Initialize map and styles
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.1443502, lng: -98.513289 },
        zoom: 4,
        //Apply Dark map style - https://mapstyle.withgoogle.com/
        styles: [
            {
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#212121'
                    }
                ]
            },
            {
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#212121'
                    }
                ]
            },
            {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'administrative.country',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#9e9e9e'
                    }
                ]
            },
            {
                featureType: 'administrative.land_parcel',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#bdbdbd'
                    }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#181818'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.stroke',
                stylers: [
                    {
                        color: '#1b1b1b'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#2c2c2c'
                    }
                ]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#8a8a8a'
                    }
                ]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#373737'
                    }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#3c3c3c'
                    }
                ]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#4e4e4e'
                    }
                ]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#616161'
                    }
                ]
            },
            {
                featureType: 'transit',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#757575'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    {
                        color: '#000000'
                    }
                ]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#3d3d3d'
                    }
                ]
            }
        ]
    });

    map.data.setStyle(function (allLocations) {
        //the count of missing children determines magnitude
        var magnitude = allLocations.getProperty('count');
        return {
            icon: getCircle(magnitude)
        };
    });
}

// Calculate radius/magnitude of circle
function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#a63f6b',
        fillOpacity: .2,
        scale: Math.log(magnitude) * 8 + 2,
        strokeColor: '#ffffff',
        strokeWeight: .5
    };
}

// 
function geocodeLocation(location, next) {

    var locationCity = allLocations[nextAddress].city;
    var locationCount = allLocations[nextAddress].count;
    var magnitude = allLocations[nextAddress].count;
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + allLocations[nextAddress].city;

    $.getJSON(url, function (res) {
        var status = res.status;
        if (status == "OK") {
            var res = res.results[0].geometry.location
            myLat = res.lat;
            myLng = res.lng;
            myLatLng = { lat: myLat, lng: myLng };
            //fix grammar in infowindow
            if (locationCount !== "1") {
                var infowindow = new google.maps.InfoWindow({
                    content: locationCount + " children went missing from " + locationCity + " in 2017."
                });
            } else {
                var infowindow = new google.maps.InfoWindow({
                    content: locationCount + " child went missing from " + locationCity + " in 2017."
                });
            }
            marker = new google.maps.Marker({
                icon: getCircle(magnitude),
                position: myLatLng,
                map: map,
                setMap: map
            });
            marker.addListener('click', function () {
                infowindow.open(map, this);
            });
        }
        else {
            //if we were sending the requests too fast, try this one again and increase the delay
            if (status !== "OK") {
                nextAddress--;
                delay++;
            } else {
                var reason = "Code " + status;
                var msg = 'address="' + locationCity + '" error=' + reason + '(delay=' + delay + 'ms)';
                console.log(msg);
            }
        }
        next();
    });
};

// Function to call the next Geocode operation when the reply comes back
function theNext() {
    if (nextAddress < allLocations.length) {
        console.log("This is the current city " + allLocations[nextAddress].city + " | lat: " + myLat + ", lng: " + myLng)
        setTimeout('geocodeLocation("' + allLocations[nextAddress].city + '", theNext)', delay);
        nextAddress++;
    } else {
        // Show map bounds
        map.fitBounds(bounds);
    }
}

// Call that function for the first time

theNext();