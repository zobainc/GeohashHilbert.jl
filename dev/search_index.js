var documenterSearchIndex = {"docs":
[{"location":"#GeohashHilbert.jl-Documentation-1","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"GeohashHilbert.jl provides a pure-Julia implementation of a Hilbert-curve-based discrete global grid, often referred to as a geohash system. GeohashHilbert.jl aims to be interoperable with the Python package geohash-hilbert in the sense that the packages agree on the encoding of each longitude-latitude pair.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"","category":"page"},{"location":"#Geohash-Hilbert-basics-1","page":"GeohashHilbert.jl Documentation","title":"Geohash Hilbert basics","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"Geohash systems (or discrete global grid systems, but geohash is shorter and sounds cooler) partition the surface of the Earth into contiguous cells and associate a hash with each cell. There are lots of reasons you might want to do this; the two most common are:","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"Hashes provide a way to compactly represent approximate locations.\nIt's convenient to group locations by the cell they're in, and computing the hash for  a given location is an easy way to look up which cell that location is in.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"The primary purposes of GeohashHilbert.jl are to encode locations and decode hashes. Encoding a location means computing the hash associated with the region of the Earth's surface that location is in. Decoding a hash means computing the locations that are encoded as that hash. Typically, the surface of the Earth can be partitioned with varying granularity. Granular partitions mean that each cell of the partition is small and a corresponding hash provides a lot of location information. Coarse partitions mean that each cell of the partition is large, and hashes provide little location information. Accordingly, hashes for granular partitions are longer than hashes for coarse partitions. An example of a maximally-coarse partition would be simply encoding the hemisphere of a longitude-latitude pair: 0 for northern hemisphere and 1 for the southern hemisphere. Notice that the hash is short (just a single bit), but if I tell you that a location has a hash of, say, 0, all you know is that the location is in the northern hemisphere.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"To encode a longitude-latitude pair as a hash string with GeohashHilbert.jl, you need to specify a precision, which is the number of characters in the resulting hash, and a bits_per_char, which unsurprisingly is how many bits of information each character in the hash encodes. Currently, we support bits_per_char of 2, 4, or 6. The bits of information in the resulting hash will then be precision * bits_per_char. When decoding a hash, the precision is inferred from the hash length and then does not need to be specified.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"warning: Warning\nDo not strip leading zeros from hashes, or else the inferred precision will be incorrect. The common cause of dropping leading zeros is writing hashes (which are strings) to a text format like CSV; when the written file is read, they may be parsed as integers which causes leading zeros to be ignored.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"The character set of your hash depends on the bits_per_char chosen:","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"bits_per_char = 2 : 0123\nbits_per_char = 4 : 0123456789abcdef\nbits_per_char = 6 : 0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"One nice property of the GeohashHilbert hashing algorithm is that hash cells at different precision levels nest perfectly. In particular, each hash cell is contained in the lower-precision hash cells corresponding to its leading bits. For example, suppose you see the precision-4 hash 3032 (bits_per_char = 2). Then you know:","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"The precision-4 cell corresponding to hash 3032 is contained within the precision-3 cell   303.\nThere are exactly 4 precision-5 cells contained in cell 3032; they are 30320, 30321,   30322, 30323.","category":"page"},{"location":"#Implementation-details-1","page":"GeohashHilbert.jl Documentation","title":"Implementation details","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"This section provides optional brief details on how the GeohashHilbert.jl hashing algorithm encodes locations; you don't need to understand this section to use GeohashHilbert.jl.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"Locations on the Earth are represented by a longitude-latitude pair. GeohashHilbert.jl implicitly \"unwraps\" the Earth into a Cartesian longitude-latitude plane. Since the earth is not a cylinder, this introduces some geometric distortion, especially near the poles. (For example, all points with latitude 90 degrees are the north pole, but GeohashHilbert.jl treats (47, 90) and (-47, 90) as different points.)","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"A hash will contain k = precision * bits_per_char bits of information. Half of these bits are used to represent the longitude, and half are used to represent the latitude, as follows. The longitude-latitude plane is divided into a n by n grid where n = 2^(k / 2). The input longitude-latitude pair is contained in exactly one cell of this n by n grid.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"The cells of the n by n grid are then ordered according to a k/2-th order Hilbert curve which passes through each grid cell exactly once. Therefore, each grid cell is associated with an integer in [0, n^2). Namely, the i-th cell along the Hilbert curve is assigned integer i-1. So, the input longitude-latitude pair is associated with the integer of the grid cell it's contained in. Finally, the integer is mapped to a hash string by simply encoding the integer in base 4, base 16, or base 64.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"Decoding a hash reverses the process: a hash string is parsed as an integer, the integer is mapped (according to the Hilbert curve) to a grid cell, and the grid cell is mapped to the latitude-longitude point at its center.","category":"page"},{"location":"#Encoding/decoding-1","page":"GeohashHilbert.jl Documentation","title":"Encoding/decoding","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"encode\ndecode\ndecode_exactly","category":"page"},{"location":"#GeohashHilbert.encode","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.encode","text":"encode(lon, lat, precision, bits_per_char = 2)\n\nEncode a longitude-latitude pair as a geohash string. The length of the resulting geohash is precision, so higher precision gives a finer grained encoding. Return the geohash string.\n\nArguments\n\nlon::Real: longitude in degrees of point to encode. Must be in [-180,180].\nlat::Real: latitude in degrees of point to encode. Must be in [-90,90].\nprecision::Integer: precision of returned geohash. Must be positive.\nbits_per_char ∈ [2,4,6]: how many bits of information each character encodes.\n\nnote: Note\nTo avoid overflow in machine arithmetic, precision * bits_per_char must be <= 62. This still allows meter-level granularity. If your use case requires sub-meter granularity, you may wish to reconsider using longitude-latitude coordinates.\n\n\n\n\n\n","category":"function"},{"location":"#GeohashHilbert.decode","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.decode","text":"decode(geohash, bits_per_char = 2)\n\nGiven a geohash string at a specified bits_per_char, return the coordinates of the corresponding geohash cell's center as a tuple (lon, lat).\n\nSee also: decode_exactly\n\n\n\n\n\n","category":"function"},{"location":"#GeohashHilbert.decode_exactly","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.decode_exactly","text":"decode_exactly(geohash, bits_per_char)\n\nGiven a geohash string at a specified bits_per_char, return the coordinates of the corresponding geohash cell's center and the error margins as a tuple (lon, lat, lon_err, lat_err). That is, each point in the corresponding cell has longitude within lon ± lon_err and likewise for latitude.\n\nSee also: rectangle\n\n\n\n\n\n","category":"function"},{"location":"#Other-features-1","page":"GeohashHilbert.jl Documentation","title":"Other features","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"neighbours\nrectangle","category":"page"},{"location":"#GeohashHilbert.neighbours","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.neighbours","text":"neighbours(geohash, bits_per_char = 2)\n\nCompute the geohashes of the cells neighboring the specified geohash cell. Return a dictionary keyed by \"north\", \"north-east\", \"east\", etc. and with values the geohash string of the corresponding adjacent cell at the same precision and bits per character. Note that cells near the poles will have only five neighbors.\n\n\n\n\n\n","category":"function"},{"location":"#GeohashHilbert.rectangle","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.rectangle","text":"rectangle(geohash, bits_per_char = 2)\n\nReturn a GeoJSON Dict that encodes as a Feature the rectangle associated with a given geohash.\n\n\n\n\n\n","category":"function"},{"location":"#Python-geohash-hilbert-interoperability-1","page":"GeohashHilbert.jl Documentation","title":"Python geohash-hilbert interoperability","text":"","category":"section"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"First and foremost, GeohashHilbert.jl and geohash-hilbert should agree on the encoding of any longitude-latitude pair at any precision and likewise agree on the decoding of any geohash string. If the packages don't agree, that's a bug, and you should feel encouraged to file an issue. As a result of this consistency, it should be safe to \"mix\" geohashes between packages. For example, you could safely encode the geohashes of points using GeohashHilbert.jl, write the hashes to a CSV file, and decode those geohashes using geohash-hilbert.","category":"page"},{"location":"#","page":"GeohashHilbert.jl Documentation","title":"GeohashHilbert.jl Documentation","text":"We've also tried to match the Python package's style and function names (e.g. neighbours instead of neighbors). The internal logic, however, is quite different and more Julian. In particular GeohashHilbert.jl uses lightweight Julia types rather than bit fiddling for its core calculations.","category":"page"}]
}
