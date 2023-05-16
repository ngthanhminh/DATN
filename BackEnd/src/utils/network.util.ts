export class NetworkFeature {

     // Kiem tra dinh dang dia chi IP
     static isValidIPAddress(IP: string): boolean {
          const pattern =
               "^(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
          return new RegExp(pattern).test(IP);
     }

     // Kiem tra dinh dang cua dia chi subnet 
     static isValidSubnet(subnet: string): boolean {
          const subnetParts = subnet.split(".");
          if (subnetParts.length !== 4) {
               return false;
          }

          for (let i = 0; i < 4; i++) {
               const part = parseInt(subnetParts[i]);

               if (isNaN(part) || part < 0 || part > 255) {
                    return false;
               }
          }

          return true;
     }

     // Kiem tra dinh dang CIDR cua subnet 
     static isValidCIDR(cidr: string): boolean {
          const parts = cidr.split("/");
          if (parts.length !== 2) {
               return false;
          }

          const subnet = parts[0];
          const prefix = parseInt(parts[1]);

          if (isNaN(prefix) || prefix < 0 || prefix > 32) {
               return false;
          }

          if (!this.isValidSubnet(subnet)) {
               return false;
          }

          const subnetParts = subnet.split(".");
          let addr = 0;
          for (let i = 0; i < 4; i++) {
               addr <<= 8;
               addr += Number(subnetParts[i]);
          }

          const bitmask = ((1 << prefix) - 1) << (32 - prefix);
          return (addr & bitmask) === addr;
     }

     // 
     ipV4ToNum(ipAddress: string): number {
          // Tách các octet của địa chỉ IP thành các phần tử của một mảng số nguyên
          const parts = ipAddress.split('.').map(Number);

          // Kiểm tra xem địa chỉ IP có hợp lệ hay không
          if (parts.some((part) => isNaN(part) || part > 255)) {
               throw new Error('Invalid IPv4 address format');
          }

          // Tính toán giá trị số nguyên tương ứng với địa chỉ IP bằng cách tính toán tổng các bit của từng octet theo công thức: a*(2^24) + b*(2^16) + c*(2^8) + d
          return parts[0] * 256 ** 3 + parts[1] * 256 ** 2 + parts[2] * 256 ** 1 + parts[3] * 256 ** 0;
     }

     numToIpV4(num: number): string {
          // Kiểm tra giá trị của số nguyên
          if (isNaN(num) || num < 0 || num >= Math.pow(2, 32)) {
               throw new Error('Invalid IPv4 address value');
          }

          // Tính toán các octet của địa chỉ IPv4 bằng cách lấy phần nguyên của phép chia từng lần cho 256 và lưu kết quả vào một mảng
          const parts: number[] = [];
          for (let i = 3; i >= 0; i--) {
               parts.push(Math.floor(num / 256 ** i));
               num %= 256 ** i;
          }

          // Gộp các octet lại thành một chuỗi địa chỉ IPv4 và trả về kết quả
          return parts.join('.');
     }

     ipv4FromOctets(...octets: number[]): string {
          // Kiểm tra giá trị của các octet
          if (octets.some((octet) => isNaN(octet) || octet < 0 || octet > 255)) {
               throw new Error('Invalid IPv4 address octet value');
          }

          // Tạo chuỗi địa chỉ IPv4 từ các octet đã cho và trả về kết quả
          return octets.join('.');
     }

     // Tính toán subnet mask từ prefix length
     static calculateSubnetMask(prefixLength: number): string {
          // Kiểm tra nếu độ dài prefix không phù hợp với IPv4
          if (prefixLength < 0 || prefixLength > 32) {
               throw new Error('Invalid prefix length.');
          }

          const binaryMask = '1'.repeat(prefixLength).padEnd(32, '0'); // Tạo ra binary mask
          const octets = [
               parseInt(binaryMask.substring(0, 8), 2),
               parseInt(binaryMask.substring(8, 16), 2),
               parseInt(binaryMask.substring(16, 24), 2),
               parseInt(binaryMask.substring(24), 2),
          ]; // Chuyển binary mask thành các octet

          const subnetMask = octets.join('.'); // Nối octets thành địa chỉ subnet mask
          return subnetMask;
     }

     // tính prefix từ subnet mask
     static subnetMaskToPrefix(subnetMask: string): number {
          const octets = subnetMask.split('.').map(Number);
          let prefix = 0;
          for (let i = 0; i < octets.length; i++) {
               const binary = (octets[i] >>> 0).toString(2); // convert to binary string
               prefix += binary.replace(/0/g, '').length; // count the number of 1s in the binary string
          }
          return prefix;
     }

     // Tính địa chỉ mạng từ địa chỉ subnet 
     static getNetworkAddress(subnet: string): string {
          const [network, prefixLength] = subnet.split('/');
          const prefix = parseInt(prefixLength);
          const octets = network.split('.').map(Number);

          // set all bits after prefix to 0
          for (let i = prefix; i < 32; i++) {
               octets[Math.floor(i / 8)] &= ~(1 << (7 - (i % 8)));
          }

          return octets.join('.');
     }

     // Tính địa chỉ subnet 
     static getHostAddress(subnet: string): string {
          const [network, prefixLength] = subnet.split('/');
          return network;
     }

     // Tinh toan dia chi mang tu dia chi gateway và subnet mask
     static calculateNetworkAddress(gateway: string, subnetMask: string): string {
          const gatewayOctets = gateway.split('.');
          const subnetMaskOctets = subnetMask.split('.');

          if (gatewayOctets.length !== 4 || subnetMaskOctets.length !== 4) {
               throw new Error('Invalid IP address or subnet mask');
          }

          const networkOctets = [];

          for (let i = 0; i < 4; i++) {
               const networkOctet = parseInt(gatewayOctets[i], 10) & parseInt(subnetMaskOctets[i], 10);
               networkOctets.push(networkOctet);
          }

          return networkOctets.join('.');
     }

     // Tính toán số địa chỉ IP trong một network
     static calcNumOfIPAddresses(networkAddress: string, netmask: string): number {
          const binaryNetworkAddress = networkAddress.split('.')
               .map(str => parseInt(str))
               .map(num => num.toString(2).padStart(8, '0'))
               .join('');

          const binaryNetmask = netmask.split('.')
               .map(str => parseInt(str))
               .map(num => num.toString(2).padStart(8, '0'))
               .join('');

          const numberOfZerosInNetmask = binaryNetmask.split('')
               .filter(bit => bit === '0')
               .length;

          const numberOfIPAddresses = Math.pow(2, numberOfZerosInNetmask);

          return numberOfIPAddresses;
     }

     static calculateIPv4CIDRRange(gateway, subnetMask) {
          // Kiểm tra định dạng của địa chỉ gateway và subnet mask
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
          if (!ipRegex.test(gateway) || !ipRegex.test(subnetMask)) {
               throw new Error('Invalid IP address or subnet mask format');
          }

          // Tính toán địa chỉ IPv4 và prefix length
          const gatewayParts = gateway.split('.').map(Number);
          const subnetMaskParts = subnetMask.split('.').map(Number);

          const ipAddr = gatewayParts.map((part, index) => part & subnetMaskParts[index]).join('.');
          const prefixLength = subnetMaskParts.reduce((sum, part) => sum + (part.toString(2).match(/1/g) || []).length, 0);

          // Trả về giá trị IPv4 CIDR range
          return `${ipAddr}/${prefixLength}`;
     }

     // Tính toán số lượng subnet từ subnet mask
     static calculateNumSubnets(subnetMask: string): number {
          // Kiểm tra định dạng của subnet mask
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
          if (!ipRegex.test(subnetMask)) {
               throw new Error('Invalid subnet mask format');
          }

          // Tính toán số lượng subnet bằng cách tính toán số bit 0 trong octet thứ tư của subnet mask
          const subnetMaskParts = subnetMask.split('.').map(Number);

          return Math.pow(2, 32 - (subnetMaskParts[3].toString(2).match(/0/g) || []).length) - 2;
     }

     // Tính toán số lượng địa chỉ IP được chia theo subnet mask
     static calculateNumIPAddresses(subnetMask: string): number {
          // Kiểm tra định dạng của subnet mask
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
          if (!ipRegex.test(subnetMask)) {
               throw new Error('Invalid subnet mask format');
          }

          // Tính toán số lượng địa chỉ IP từ subnet mask bằng cách tính toán số bit 0
          const subnetMaskParts = subnetMask.split('.').map(Number);

          const numBits = subnetMaskParts.reduce((acc, part) => acc + (255 - part).toString(2).replace(/0/g, '').length, 0);

          return Math.pow(2, numBits) - 2;
     }

     // Trả về danh sách địa chỉ IP trong một subnet 
     generateIPRange(networkAddress: string, subnetMask: string): string[] {
          // Kiểm tra định dạng của địa chỉ network và subnet mask
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
          if (!ipRegex.test(networkAddress) || !ipRegex.test(subnetMask)) {
               throw new Error('Invalid network address or subnet mask format');
          }

          // Tách các octet của địa chỉ network và subnet mask thành các phần tử của các mảng số nguyên
          const networkAddressParts = networkAddress.split('.').map(Number);
          const subnetMaskParts = subnetMask.split('.').map(Number);

          // Tính toán địa chỉ broadcast từ địa chỉ network và subnet mask
          const broadcastAddressParts = networkAddressParts.map((part, index) => part | (~subnetMaskParts[index] & 255));

          // Tạo danh sách các địa chỉ IP bằng cách duyệt qua tất cả các địa chỉ từ địa chỉ network đến địa chỉ broadcast
          const ipAddresses: string[] = [];
          for (let i = this.ipV4ToNum(networkAddress); i <= this.ipV4ToNum(this.ipv4FromOctets(...broadcastAddressParts)); i++) {
               ipAddresses.push(this.numToIpV4(i));
          }

          console.log(ipAddresses);
          return ipAddresses;
     }

     // Lay danh sách dia chi IP hop le tu mot dia chi mang
     static getValidIPAddresses(networkAddress: string, prefixLength: number): string[] {
          const subnetBits = 32 - prefixLength;
          const hostCount = Math.pow(2, subnetBits);
          const startAddress = this.ip2long(networkAddress);
          const endAddress = startAddress + hostCount - 1;

          const validIPs = [];

          for (let i = startAddress + 1; i <= endAddress - 1; i++) {
               validIPs.push(this.long2ip(i));
          }

          return validIPs;
     }

     static ip2long(ip: string) {
          const parts = ip.split(".");
          let long = 0;
          for (let i = 0; i < 4; i++) {
               long += parseInt(parts[i]) << (8 * (3 - i));
          }
          return long >>> 0; // convert to unsigned
     }

     static long2ip(long: number) {
          const part1 = (long >>> 24) & 255;
          const part2 = (long >>> 16) & 255;
          const part3 = (long >>> 8) & 255;
          const part4 = long & 255;
          return part1 + "." + part2 + "." + part3 + "." + part4;
     }

}