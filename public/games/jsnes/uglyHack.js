//My attempt for a patch for mapper 9.
JSNES.Mappers[9] = function(nes) {
    this.nes = nes;
    console.log('MAPPER 9 ugly hack is being used!');
};

JSNES.Mappers[9].prototype = new JSNES.Mappers[0]();

JSNES.Mappers[9].prototype.write = function(address, value) {
    console.log('Mapper_9: Writing');
    if (address < 0x8000) {
        JSNES.Mappers[0].prototype.write.apply(this, arguments);
        return;
    }else{
        value &= 0xFF;
        address &= 0xF000;
        
        switch (address >> 12) {
            case 0xA: {
                // Select 8k ROM bank at 0x8000
                this.load8kRomBank(value, 0x8000);
                return;
                
            }
            case 0xB: {

                // Select 4k VROM bank at 0x0000, $FD mode
                latchLoVal1 = value;
                if (latchLo == 0xFD) {
                    this.loadVromBank(value, 0x0000);
                }
                
                return;
            }
            case 0xC: {

                // Select 4k VROM bank at 0x0000, $FE mode
                latchLoVal2 = value;
                if (latchLo == 0xFE) {
                    this.loadVromBank(value, 0x0000);
                }
                return;

            }
            case 0xD: {

                // Select 4k VROM bank at 0x1000, $FD mode
                latchHiVal1 = value;
                if (latchHi == 0xFD) {
                    this.loadVromBank(value, 0x1000);
                }
                return;
            }
            case 0xE: {
                // Select 4k VROM bank at 0x1000, $FE mode
                latchHiVal2 = value;
                if (latchHi == 0xFE) {
                    this.loadVromBank(value, 0x1000);
                }
                return;
            }
            case 0xF: {

                // Select mirroring
                
                if ((value & 0x1) == 0) {
                    // Vertical mirroring
                    
                    this.nes.getPpu().setMirroring(this.nes.rom.VERTICAL_MIRRORING);
                } else {

                    // Horizontal mirroring
                    this.nes.getPpu().setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);

                }
                return;
            }
                             }
    }
};

JSNES.Mappers[9].prototype.loadROM = function(rom) {
    if (!this.nes.rom.valid) {
        console.log("MMC2: Invalid ROM! Unable to load.");
        return;
    }
    
    // Get number of 8K banks:
    var num_8k_banks = this.nes.rom.romCount * 2;
    // Load PRG-ROM:
    this.load8kRomBank(0, 0x8000);
    this.load8kRomBank(num_8k_banks - 3, 0xA000);
    this.load8kRomBank(num_8k_banks - 2, 0xC000);
    this.load8kRomBank(num_8k_banks - 1, 0xE000);

    // Load CHR-ROM:
    this.loadCHRROM();

    // Load Battery RAM (if present):
    this.loadBatteryRam();

    // Do Reset-Interrupt:
    this.nes.getCpu().requestIrq(this.nes.cpu.IRQ_RESET);
};

