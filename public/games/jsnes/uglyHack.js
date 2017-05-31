//My attempt for a patch for mapper 9.
JSNES.Mappers[9] = function(nes) {
    this.nes = nes;
    this.latchLo = null;
    this.latchHi = null;
    this.latchLoVal1 = null;
    this.latchLoVal2 = null;
    this.latchHiVal1 = null;
    this.latchHiVal2 = null;
    
    console.log('MAPPER 9 ugly hack is being used!');
};

JSNES.Mappers[9].prototype = new JSNES.Mappers[0]();

JSNES.Mappers[9].prototype.write = function(address, value) {

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
                this.latchLoVal1 = value;
                if (this.latchLo == 0xFD) {
                    this.loadVromBank(value, 0x0000);
                }
                
                return;
            }
            case 0xC: {

                // Select 4k VROM bank at 0x0000, $FE mode
                this.latchLoVal2 = value;
                if (this.latchLo == 0xFE) {
                    this.loadVromBank(value, 0x0000);
                }
                return;

            }
            case 0xD: {

                // Select 4k VROM bank at 0x1000, $FD mode
                this.latchHiVal1 = value;
                if (this.latchHi == 0xFD) {
                    this.loadVromBank(value, 0x1000);
                }
                return;
            }
            case 0xE: {
                // Select 4k VROM bank at 0x1000, $FE mode
                this.latchHiVal2 = value;
                if (this.latchHi == 0xFE) {
                    this.loadVromBank(value, 0x1000);
                }
                return;
            }
            case 0xF: {

                // Select mirroring
                
                if ((value & 0x1) == 0) {
                    // Vertical mirroring
                    
                    this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
                } else {

                    // Horizontal mirroring
                    this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);

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
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
};

JSNES.mappers[9].prototype.latchAccess = function(address) {
        if ((address & 0x1FF0) == 0x0FD0 && this.latchLo != 0xFD) {
            // Set $FD mode
            this.loadVromBank(this.latchLoVal1, 0x0000);
            this.latchLo = 0xFD;
        //System.out.println("LO FD");
        } else if ((address & 0x1FF0) == 0x0FE0 && this.latchLo != 0xFE) {
            // Set $FE mode
            this.loadVromBank(this.latchLoVal2, 0x0000);
            this.latchLo = 0xFE;
        //System.out.println("LO FE");
        } else if ((address & 0x1FF0) == 0x1FD0 && this.latchHi != 0xFD) {
            // Set $FD mode
            this.loadVromBank(this.latchHiVal1, 0x1000);
            this.latchHi = 0xFD;
        //System.out.println("HI FD");
        } else if ((address & 0x1FF0) == 0x1FE0 && this.latchHi != 0xFE) {
            // Set $FE mode
            this.loadVromBank(this.latchHiVal2, 0x1000);
            this.latchHi = 0xFE;
        //System.out.println("HI FE");
        }
    }

