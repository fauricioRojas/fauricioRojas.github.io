/* ################### PDF ################### */
var doc = new jsPDF();

$('#pdf').click(function () {
    doc.save('Lista de subredes.pdf')
});

/* ################### CALCULO DE SUB REDES ################### */
function getOcteto(clase) {
    if (clase === 'A') {
        return 24;
    }
    else if (clase === 'B') {
        return 16;   
    }
    else {
        return 8;
    }
}

function binaryDecimal(binary) {
   return parseInt(parseInt(binary), 2).toString(10);
}

function decimalBinary(decimal, length) {
    var binary = parseInt(decimal, 10).toString(2);
        i = 0,
        ceros = '';
    
    for ( ; i < length - binary.length; i++) {
        ceros += '0';
    }
    
    return ceros + binary;
}

function getNewMask(subredes, clase) {
    var i = 0,
        bits = '',
        binary = '',
        octeto = getOcteto(clase);

    i = 0;
    for( ; i < octeto; i++) {
        if (i < subredes) {
            bits += '1';
        }
        else {
            bits += '0';
        }

        if((i+1) % 8 === 0 && i+1 < octeto) {
            bits += '.';
        }
    }
    
    bits = bits.split('.');
    if (octeto === 8) {
        binary = ['11111111','11111111','11111111', bits[0]];
    }
    else if (octeto === 16) {
        binary = ['11111111','11111111', bits[0], bits[1]];   
    }
    else {
        binary = ['11111111', bits[0], bits[1], bits[2]];
    }
    
    return binaryDecimal(binary[0]) + '.' + binaryDecimal(binary[1]) + '.' + binaryDecimal(binary[2]) + '.' + binaryDecimal(binary[3]);
}

function printInfo(ip, clase, defaultMask, hosts, subredes) {
    var box = document.createElement('div');
        div = document.createElement('div'),
        separator = document.createElement('p'),
        h3 = document.createElement('h3'),
        binary = getNewMask(subredes, clase);

    h3.appendChild(document.createTextNode('LISTA DE SUB REDES'));
    box.appendChild(h3);
    doc.text(20, 30, '                                       LISTA DE SUBREDES');

    div.appendChild(document.createTextNode('Class: ' + clase));
    box.appendChild(div);
    doc.text(20, 50, 'IP:                     ' + ip);
    doc.text(20, 60, 'Class:                ' + clase);

    div = document.createElement('div');
    div.appendChild(document.createTextNode('Default mask: ' + defaultMask));
    box.appendChild(div);
    doc.text(20, 70, 'Default mask:    ' + defaultMask);

    div = document.createElement('div');
    div.appendChild(document.createTextNode('Sub mask: ' + binary));
    box.appendChild(div);
    doc.text(20, 80, 'Sub mask:         ' + binary);

    div = document.createElement('div');
    div.appendChild(document.createTextNode('Hosts: ' + Math.pow(2, hosts)));
    box.appendChild(div);
    doc.text(20, 90, 'Hosts:                ' + Math.pow(2, hosts));

    div = document.createElement('div');
    div.appendChild(document.createTextNode('Usable hosts: ' + (Math.pow(2, hosts) - 2)));
    box.appendChild(div);
    doc.text(20, 100, 'Usable hosts:    ' + (Math.pow(2, hosts) - 2));

    div = document.createElement('div');
    div.appendChild(document.createTextNode('Sub networks: ' + Math.pow(2, subredes)));
    doc.text(20, 110, 'Sub networks:   ' + Math.pow(2, subredes));

    separator.appendChild(document.createTextNode('-----------------------------------------------------------------------------'));
    box.appendChild(div);
    box.appendChild(separator);

    document.getElementById('content').appendChild(box);
}
function printSubredes(arraySubnets, bitsHosts) {
    var box = document.createElement('div'),
        div,
        h3 = document.createElement('h3'), 
        i = 0,
        length = arraySubnets.length,
        ip,
        broadcast,
        start,
        finish,
        line = 140;

    h3.appendChild(document.createTextNode('IP - BROADCAST - INICIAL - FINAL'));
    doc.text(20, 130, '         IP             BROADCAST      INICIAL             FINAL');
    box.appendChild(h3);
    for ( ; i < length; i ++) {
        div = document.createElement('div');
        ip = arraySubnets[i].ip[0] + '.' + arraySubnets[i].ip[1] + '.' + arraySubnets[i].ip[2] + '.' + arraySubnets[i].ip[3] + '/' + (32 - bitsHosts);
        broadcast = arraySubnets[i].broadcast[0] + '.' + arraySubnets[i].broadcast[1] + '.' + arraySubnets[i].broadcast[2] + '.' + arraySubnets[i].broadcast[3];
        start = arraySubnets[i].start[0] + '.' + arraySubnets[i].start[1] + '.' + arraySubnets[i].start[2] + '.' + arraySubnets[i].start[3];
        finish = arraySubnets[i].finish[0] + '.' + arraySubnets[i].finish[1] + '.' + arraySubnets[i].finish[2] + '.' + arraySubnets[i].finish[3];

        doc.text(20, line, ip + '        ' + broadcast + '          ' + start + '        ' + finish);

        div.appendChild(document.createTextNode(ip + ' - ' + broadcast + ' - ' + start + ' - ' + finish));
        box.appendChild(div);
        if(line === 270) {
            doc.addPage();
            line = 30;
        }
        else {
            line += 10;
        }
    }

    document.getElementById('content').appendChild(box);
}

function hostAndSubredes(type, bits, clase) {
    var i = 0,
        length = Math.pow(2, 24),
        size;

    for ( ; i < length; i++) {
        size = Math.pow(2, i);
        if (bits <= size-2 && type === 'hosts') {
            break;
        }
        else if (bits <= size && type === 'subredes') {
            break;
        }
    }

    if (type === 'hosts') {
        return [i,  getOcteto(clase) - i]
    }
    else {
        return [getOcteto(clase) - i, i]
    }
}

function classAndDefaultMask(number) {
    var i = 0,
        clase = '',
        arrayClass = [{clase: 'A', min: 1, max: 127, mask: '255.0.0.0'}, {clase: 'B', min: 128, max: 191, mask: '255.255.0.0'}, {clase: 'C', min: 192, max: 223, mask: '255.255.255.0'}];
    
    for ( ; i < 3; i++) {
        if (parseInt(number) >= arrayClass[i].min && parseInt(number) <= arrayClass[i].max) {
            return [arrayClass[i].clase, arrayClass[i].mask];
        }
    }
}

function formatIP(arrayIP) {
    var i = 0;

    for ( ; i < 4; i++) {
        if (isNaN(parseInt(arrayIP[i]))) {
            return false;
        }
        else if (parseInt(arrayIP[i]) < 0 && parseInt(arrayIP[i]) > 255) {
            return false;
        }
    }

    return true;
}
function lengthIP(arrayIP) {
    if (arrayIP.length === 4) {
        return true;
    }
    else {
        return false;   
    }
}

function isIP(arrayIP) {
    if (lengthIP(arrayIP)) {
        if (formatIP(arrayIP)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function calcBroadcast(i, octeto, bitsSubnets, bitsHosts, ip) {
    var binary = decimalBinary(i, bitsSubnets),
        i = 0,
        ones = '',
        octeto = 8,
        length,
        newBinary = '',
        arrayIP = ip.split('.');

    for ( ; i < bitsHosts; i++) {
        ones += '1';
    }

    binary = binary + ones;

    i = 0;
    length = binary.length;
    for ( ; i < length; i++) {
        if (i === octeto) {
            newBinary += '.' + binary.charAt(i);
        }
        else {
            newBinary += binary.charAt(i);
        }
    }

    newBinary = newBinary.split('.');
    if (octeto === 8) {
        return [arrayIP[0], arrayIP[1], arrayIP[2], binaryDecimal(newBinary[0])];
    }
    else if (octeto === 8) {
        return [arrayIP[0], arrayIP[1], binaryDecimal(newBinary[0]), binaryDecimal(newBinary[1])];
    }
    else {
        return [arrayIP[0], binaryDecimal(newBinary[0]), binaryDecimal(newBinary[1]), binaryDecimal(newBinary[1])];
    }
}

function calcSubNet(i, octeto, bitsSubnets, bitsHosts, ip) {
    var binary = decimalBinary(i, bitsSubnets),
        i = 0,
        zeros = '',
        octeto = 8,
        length,
        newBinary = '',
        arrayIP = ip.split('.');

    for ( ; i < bitsHosts; i++) {
        zeros += '0';
    }

    binary = binary + zeros;

    i = 0;
    length = binary.length;
    for ( ; i < length; i++) {
        if (i === octeto) {
            newBinary += '.' + binary.charAt(i);
        }
        else {
            newBinary += binary.charAt(i);
        }
    }
    
    newBinary = newBinary.split('.');
    if (octeto === 8) {
        return [arrayIP[0], arrayIP[1], arrayIP[2], binaryDecimal(newBinary[0])];
    }
    else if (octeto === 8) {
        return [arrayIP[0], arrayIP[1], binaryDecimal(newBinary[0]), binaryDecimal(newBinary[1])];
    }
    else {
        return [arrayIP[0], binaryDecimal(newBinary[0]), binaryDecimal(newBinary[1]), binaryDecimal(newBinary[1])];
    }
}
function subNets(ip, bitsHosts, bitsSubnets, clase) {
    var octeto = getOcteto(clase),
        binary = decimalBinary(ip).split('.'),
        arraySubnets = [],
        i = 0,
        subNets = Math.pow(2, bitsSubnets);

    for ( ; i < subNets; i++) {
        arraySubnets[i] = {
                            ip: calcSubNet(i, octeto, bitsSubnets, bitsHosts, ip),
                            broadcast: calcBroadcast(i, octeto, bitsSubnets, bitsHosts, ip),
                            start: [],
                            finish: []
                        };

        arraySubnets[i].start = [arraySubnets[i].ip[0],arraySubnets[i].ip[1],arraySubnets[i].ip[2],parseInt(arraySubnets[i].ip[3]) + 1];
        arraySubnets[i].finish = [arraySubnets[i].broadcast[0],arraySubnets[i].broadcast[1],arraySubnets[i].broadcast[2],parseInt(arraySubnets[i].broadcast[3]) - 1];
    }

    printSubredes(arraySubnets, bitsHosts);
}

$('#calcular').click(function() {
    var ip = $('#ip').val(),
        type = $('#type').val(),
        bits = parseInt($('#number').val()),
        arrayIP = ip.split('.');

    if (!isNaN(bits)) {
        if (isIP(arrayIP)) {
            var classDefaultMask = classAndDefaultMask(arrayIP[0]),
                hostSubredes = hostAndSubredes(type, bits, classDefaultMask[0]);
            printInfo(ip, classDefaultMask[0], classDefaultMask[1], hostSubredes[0], hostSubredes[1]);
            subNets(ip, hostSubredes[0], hostSubredes[1], classDefaultMask[0]);
        }
        else {
            $('#msg').text('Invalid IP.');
        }
    }
    else {
        $('#msg').text('Enter a hosts/subnets number.');
    }
});