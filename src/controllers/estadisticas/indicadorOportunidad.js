const {consultarEstadisticaOportunidad}  = require('../../bd/bd.js')
 
 
document.addEventListener('DOMContentLoaded', async()=>{
    const oportunidad = await consultarEstadisticaOportunidad()
    let data = {}
	
    oportunidad.forEach(reporte => {

     	const fechaReporte =  new Date(reporte.fechareporte)
		const fechaSolicitud = new Date (reporte.fecha_solicitud)
		let diferencia= Math.abs(fechaReporte-fechaSolicitud);
		let days = diferencia/(1000 * 3600 * 24)
		
        
    	switch (fechaReporte.getMonth()){
        	case 0:
        		switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.eneroEac)){
							data.eneroEac=0
							data.eneroEacSuma = 0
						}
						data.eneroEac = data.eneroEac + 1
						data.eneroEacSuma = data.eneroEacSuma + days
				
					break
					case'EAG':
						if( isNaN(data.eneroEag)){
							data.eneroEag=0
							data.eneroEagSuma = 0
						}
						data.eneroEag = data.eneroEag + 1
						data.eneroEagSuma = data.eneroEagSuma + days
					break
					case'EC':
						if( isNaN(data.eneroEc)){
								data.eneroEc=0
								data.eneroEcSuma = 0
							}
						data.eneroEc = data.eneroEc + 1
						data.eneroEcSuma = data.eneroEcSuma + days
					break
					case'EM':
						if( isNaN(data.eneroEm)){
								data.eneroEm=0
								data.eneroEmSuma = 0
							}
						data.eneroEm = data.eneroEm + 1
						data.eneroEmSuma = data.eneroEmSuma + days
					break
					case'EMA':
						if( isNaN(data.eneroEma)){
								data.eneroEma=0
								data.eneroEmaSuma = 0
							}
						data.eneroEma = data.eneroEma + 1
						data.eneroEmaSuma = data.eneroEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.eneroIn1)){
									data.eneroIn1=0
									data.eneroIn1Suma = 0
								}
								data.eneroIn1 = data.eneroIn1 + 1
								data.eneroIn1Suma = data.eneroIn1Suma + days
							break
							case'0002':
								if( isNaN(data.eneroIn2)){
									data.eneroIn2=0
									data.eneroIn2Suma = 0
								}
								data.eneroIn2 = data.eneroIn2 + 1
								data.eneroIn2Suma = data.eneroIn2Suma + days
							break
							case'0003':
								if( isNaN(data.eneroIn3)){
									data.eneroIn3=0
									data.eneroIn3Suma = 0
								}
								data.eneroIn3 = data.eneroIn3 + 1
								data.eneroIn3Suma = data.eneroIn3Suma + days
							break
							case'0004':
								if( isNaN(data.eneroIn4)){
									data.eneroIn4=0
									data.eneroIn4Suma = 0
								}
								data.eneroIn4 = data.eneroIn4 + 1
								data.eneroIn4Suma = data.eneroIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.eneroMo)){
							data.eneroMo=0
							data.eneroMoSuma = 0
						}
						data.eneroMo = data.eneroMo + 1
						data.eneroMoSuma = data.eneroMoSuma + days
					break
					default:					
					break
				}
			break
			case 1:
        		switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.febreroEac)){
							data.febreroEac=0
							data.febreroEacSuma = 0
						}
						data.febreroEac = data.febreroEac + 1
						data.febreroEacSuma = data.febreroEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.febreroEag)){
							data.febreroEag=0
							data.febreroEagSuma = 0
						}
						data.febreroEag = data.febreroEag + 1
						data.febreroEagSuma = data.febreroEagSuma + days
					break
					case'EC':
						if( isNaN(data.febreroEc)){
								data.febreroEc=0
								data.febreroEcSuma = 0
							}
						data.febreroEc = data.febreroEc + 1
						data.febreroEcSuma = data.febreroEcSuma + days
					break
					case'EM':
						if( isNaN(data.febreroEm)){
								data.febreroEm=0
								data.febreroEmSuma = 0
							}
						data.febreroEm = data.febreroEm + 1
						data.febreroEmSuma = data.febreroEmSuma + days
					break
					case'EMA':
						if( isNaN(data.febreroEma)){
								data.febreroEma=0
								data.febreroEmaSuma = 0
							}
						data.febreroEma = data.febreroEma + 1
						data.febreroEmaSuma = data.febreroEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.febreroIn1)){
									data.febreroIn1=0
									data.febreroIn1Suma = 0
								}
								data.febreroIn1 = data.febreroIn1 + 1
								data.febreroIn1Suma = data.febreroIn1Suma + days
							break
							case'0002':
								if( isNaN(data.febreroIn2)){
									data.febreroIn2=0
									data.febreroIn2Suma = 0
								}
								data.febreroIn2 = data.febreroIn2 + 1
								data.febreroIn2Suma = data.febreroIn2Suma + days
							break
							case'0003':
								if( isNaN(data.febreroIn3)){
									data.febreroIn3=0
									data.febreroIn3Suma = 0
								}
								data.febreroIn3 = data.febreroIn3 + 1
								data.febreroIn3Suma = data.febreroIn3Suma + days
							break
							case'0004':
								if( isNaN(data.febreroIn4)){
									data.febreroIn4=0
									data.febreroIn4Suma = 0
								}
								data.febreroIn4 = data.febreroIn4 + 1
								data.febreroIn4Suma = data.febreroIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.febreroMo)){
							data.febreroMo=0
							data.febreroMoSuma = 0
						}
						data.febreroMo = data.febreroMo + 1
						data.febreroMoSuma = data.febreroMoSuma + days
					break
					default:					
					break
				}
			break				
			case 2:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.marzoEac)){
							data.marzoEac=0
							data.marzoEacSuma = 0
						}
						data.marzoEac = data.marzoEac + 1
						data.marzoEacSuma = data.marzoEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.marzoEag)){
							data.marzoEag=0
							data.marzoEagSuma = 0
						}
						data.marzoEag = data.marzoEag + 1
						data.marzoEagSuma = data.marzoEagSuma + days
					break
					case'EC':
						if( isNaN(data.marzoEc)){
								data.marzoEc=0
								data.marzoEcSuma = 0
							}
						data.marzoEc = data.marzoEc + 1
						data.marzoEcSuma = data.marzoEcSuma + days
					break
					case'EM':
						if( isNaN(data.marzoEm)){
								data.marzoEm=0
								data.marzoEmSuma = 0
							}
						data.marzoEm = data.marzoEm + 1
						data.marzoEmSuma = data.marzoEmSuma + days
					break
					case'EMA':
						if( isNaN(data.marzoEma)){
								data.marzoEma=0
								data.marzoEmaSuma = 0
							}
						data.marzoEma = data.marzoEma + 1
						data.marzoEmaSuma = data.marzoEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.marzoIn1)){
									data.marzoIn1=0
									data.marzoIn1Suma = 0
								}
								data.marzoIn1 = data.marzoIn1 + 1
								data.marzoIn1Suma = data.marzoIn1Suma + days
							break
							case'0002':
								if( isNaN(data.marzoIn2)){
									data.marzoIn2=0
									data.marzoIn2Suma = 0
								}
								data.marzoIn2 = data.marzoIn2 + 1
								data.marzoIn2Suma = data.marzoIn2Suma + days
							break
							case'0003':
								if( isNaN(data.marzoIn3)){
									data.marzoIn3=0
									data.marzoIn3Suma = 0
								}
								data.marzoIn3 = data.marzoIn3 + 1
								data.marzoIn3Suma = data.marzoIn3Suma + days
							break
							case'0004':
								if( isNaN(data.marzoIn4)){
									data.marzoIn4=0
									data.marzoIn4Suma = 0
								}
								data.marzoIn4 = data.marzoIn4 + 1
								data.marzoIn4Suma = data.marzoIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.marzoMo)){
							data.marzoMo=0
							data.marzoMoSuma = 0
						}
						data.marzoMo = data.marzoMo + 1
						data.marzoMoSuma = data.marzoMoSuma + days
					break
					default:					
					break
				}        	
			break
			case 3:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.abrilEac)){
							data.abrilEac=0
							data.abrilEacSuma = 0
						}
						data.abrilEac = data.abrilEac + 1
						data.abrilEacSuma = data.abrilEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.abrilEag)){
							data.abrilEag=0
							data.abrilEagSuma = 0
						}
						data.abrilEag = data.abrilEag + 1
						data.abrilEagSuma = data.abrilEagSuma + days
					break
					case'EC':
						if( isNaN(data.abrilEc)){
								data.abrilEc=0
								data.abrilEcSuma = 0
							}
						data.abrilEc = data.abrilEc + 1
						data.abrilEcSuma = data.abrilEcSuma + days
					break
					case'EM':
						if( isNaN(data.abrilEm)){
								data.abrilEm=0
								data.abrilEmSuma = 0
							}
						data.abrilEm = data.abrilEm + 1
						data.abrilEmSuma = data.abrilEmSuma + days
					break
					case'EMA':
						if( isNaN(data.abrilEma)){
								data.abrilEma=0
								data.abrilEmaSuma = 0
							}
						data.abrilEma = data.abrilEma + 1
						data.abrilEmaSuma = data.abrilEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.abrilIn1)){
									data.abrilIn1=0
									data.abrilIn1Suma = 0
								}
								data.abrilIn1 = data.abrilIn1 + 1
								data.abrilIn1Suma = data.abrilIn1Suma + days
							break
							case'0002':
								if( isNaN(data.abrilIn2)){
									data.abrilIn2=0
									data.abrilIn2Suma = 0
								}
								data.abrilIn2 = data.abrilIn2 + 1
								data.abrilIn2Suma = data.abrilIn2Suma + days
							break
							case'0003':
								if( isNaN(data.abrilIn3)){
									data.abrilIn3=0
									data.abrilIn3Suma = 0
								}
								data.abrilIn3 = data.abrilIn3 + 1
								data.abrilIn3Suma = data.abrilIn3Suma + days
							break
							case'0004':
								if( isNaN(data.abrilIn4)){
									data.abrilIn4=0
									data.abrilIn4Suma = 0
								}
								data.abrilIn4 = data.abrilIn4 + 1
								data.abrilIn4Suma = data.abrilIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.abrilMo)){
							data.abrilMo=0
							data.abrilMoSuma = 0
						}
						data.abrilMo = data.abrilMo + 1
						data.abrilMoSuma = data.abrilMoSuma + days
					break
					default:					
					break
				}        		
			break
			case 4:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.mayoEac)){
							data.mayoEac=0
							data.mayoEacSuma = 0
						}
						data.mayoEac = data.mayoEac + 1
						data.mayoEacSuma = data.mayoEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.mayoEag)){
							data.mayoEag=0
							data.mayoEagSuma = 0
						}
						data.mayoEag = data.mayoEag + 1
						data.mayoEagSuma = data.mayoEagSuma + days
					break
					case'EC':
						if( isNaN(data.mayoEc)){
								data.mayoEc=0
								data.mayoEcSuma = 0
							}
						data.mayoEc = data.mayoEc + 1
						data.mayoEcSuma = data.mayoEcSuma + days
					break
					case'EM':
						if( isNaN(data.mayoEm)){
								data.mayoEm=0
								data.mayoEmSuma = 0
							}
						data.mayoEm = data.mayoEm + 1
						data.mayoEmSuma = data.mayoEmSuma + days
					break
					case'EMA':
						if( isNaN(data.mayoEma)){
								data.mayoEma=0
								data.mayoEmaSuma = 0
							}
						data.mayoEma = data.mayoEma + 1
						data.mayoEmaSuma = data.mayoEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.mayoIn1)){
									data.mayoIn1=0
									data.mayoIn1Suma = 0
								}
								data.mayoIn1 = data.mayoIn1 + 1
								data.mayoIn1Suma = data.mayoIn1Suma + days
							break
							case'0002':
								if( isNaN(data.mayoIn2)){
									data.mayoIn2=0
									data.mayoIn2Suma = 0
								}
								data.mayoIn2 = data.mayoIn2 + 1
								data.mayoIn2Suma = data.mayoIn2Suma + days
							break
							case'0003':
								if( isNaN(data.mayoIn3)){
									data.mayoIn3=0
									data.mayoIn3Suma = 0
								}
								data.mayoIn3 = data.mayoIn3 + 1
								data.mayoIn3Suma = data.mayoIn3Suma + days
							break
							case'0004':
								if( isNaN(data.mayoIn4)){
									data.mayoIn4=0
									data.mayoIn4Suma = 0
								}
								data.mayoIn4 = data.mayoIn4 + 1
								data.mayoIn4Suma = data.mayoIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.mayoMo)){
							data.mayoMo=0
							data.mayoMoSuma = 0
						}
						data.mayoMo = data.mayoMo + 1
						data.mayoMoSuma = data.mayoMoSuma + days
					break
					default:					
					break
				}        		
			break
			case 5:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.junioEac)){
							data.junioEac=0
							data.junioEacSuma = 0
						}
						data.junioEac = data.junioEac + 1
						data.junioEacSuma = data.junioEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.junioEag)){
							data.junioEag=0
							data.junioEagSuma = 0
						}
						data.junioEag = data.junioEag + 1
						data.junioEagSuma = data.junioEagSuma + days
					break
					case'EC':
						if( isNaN(data.junioEc)){
								data.junioEc=0
								data.junioEcSuma = 0
							}
						data.junioEc = data.junioEc + 1
						data.junioEcSuma = data.junioEcSuma + days
					break
					case'EM':
						if( isNaN(data.junioEm)){
								data.junioEm=0
								data.junioEmSuma = 0
							}
						data.junioEm = data.junioEm + 1
						data.junioEmSuma = data.junioEmSuma + days
					break
					case'EMA':
						if( isNaN(data.junioEma)){
								data.junioEma=0
								data.junioEmaSuma = 0
							}
						data.junioEma = data.junioEma + 1
						data.junioEmaSuma = data.junioEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.junioIn1)){
									data.junioIn1=0
									data.junioIn1Suma = 0
								}
								data.junioIn1 = data.junioIn1 + 1
								data.junioIn1Suma = data.junioIn1Suma + days
							break
							case'0002':
								if( isNaN(data.junioIn2)){
									data.junioIn2=0
									data.junioIn2Suma = 0
								}
								data.junioIn2 = data.junioIn2 + 1
								data.junioIn2Suma = data.junioIn2Suma + days
							break
							case'0003':
								if( isNaN(data.junioIn3)){
									data.junioIn3=0
									data.junioIn3Suma = 0
								}
								data.junioIn3 = data.junioIn3 + 1
								data.junioIn3Suma = data.junioIn3Suma + days
							break
							case'0004':
								if( isNaN(data.junioIn4)){
									data.junioIn4=0
									data.junioIn4Suma = 0
								}
								data.junioIn4 = data.junioIn4 + 1
								data.junioIn4Suma = data.junioIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.junioMo)){
							data.junioMo=0
							data.junioMoSuma = 0
						}
						data.junioMo = data.junioMo + 1
						data.junioMoSuma = data.junioMoSuma + days
					break
					default:					
					break
				}        		
			break
			case 6:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.julioEac)){
							data.julioEac=0
							data.julioEacSuma = 0
						}
						data.julioEac = data.julioEac + 1
						data.julioEacSuma = data.julioEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.julioEag)){
							data.julioEag=0
							data.julioEagSuma = 0
						}
						data.julioEag = data.julioEag + 1
						data.julioEagSuma = data.julioEagSuma + days
					break
					case'EC':
						if( isNaN(data.julioEc)){
								data.julioEc=0
								data.julioEcSuma = 0
							}
						data.julioEc = data.julioEc + 1
						data.julioEcSuma = data.julioEcSuma + days
					break
					case'EM':
						if( isNaN(data.julioEm)){
								data.julioEm=0
								data.julioEmSuma = 0
							}
						data.julioEm = data.julioEm + 1
						data.julioEmSuma = data.julioEmSuma + days
					break
					case'EMA':
						if( isNaN(data.julioEma)){
								data.julioEma=0
								data.julioEmaSuma = 0
							}
						data.julioEma = data.julioEma + 1
						data.julioEmaSuma = data.julioEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.julioIn1)){
									data.julioIn1=0
									data.julioIn1Suma = 0
								}
								data.julioIn1 = data.julioIn1 + 1
								data.julioIn1Suma = data.julioIn1Suma + days
							break
							case'0002':
								if( isNaN(data.julioIn2)){
									data.julioIn2=0
									data.julioIn2Suma = 0
								}
								data.julioIn2 = data.julioIn2 + 1
								data.julioIn2Suma = data.julioIn2Suma + days
							break
							case'0003':
								if( isNaN(data.julioIn3)){
									data.julioIn3=0
									data.julioIn3Suma = 0
								}
								data.julioIn3 = data.julioIn3 + 1
								data.julioIn3Suma = data.julioIn3Suma + days
							break
							case'0004':
								if( isNaN(data.julioIn4)){
									data.julioIn4=0
									data.julioIn4Suma = 0
								}
								data.julioIn4 = data.julioIn4 + 1
								data.julioIn4Suma = data.julioIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.julioMo)){
							data.julioMo=0
							data.julioMoSuma = 0
						}
						data.julioMo = data.julioMo + 1
						data.julioMoSuma = data.julioMoSuma + days
					break
					default:					
					break
				}     		
			break			
			case 7:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.agostoEac)){
							data.agostoEac=0
							data.agostoEacSuma = 0
						}
						data.agostoEac = data.agostoEac + 1
						data.agostoEacSuma = data.agostoEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.agostoEag)){
							data.agostoEag=0
							data.agostoEagSuma = 0
						}
						data.agostoEag = data.agostoEag + 1
						data.agostoEagSuma = data.agostoEagSuma + days
					break
					case'EC':
						if( isNaN(data.agostoEc)){
								data.agostoEc=0
								data.agostoEcSuma = 0
							}
						data.agostoEc = data.agostoEc + 1
						data.agostoEcSuma = data.agostoEcSuma + days
					break
					case'EM':
						if( isNaN(data.agostoEm)){
								data.agostoEm=0
								data.agostoEmSuma = 0
							}
						data.agostoEm = data.agostoEm + 1
						data.agostoEmSuma = data.agostoEmSuma + days
					break
					case'EMA':
						if( isNaN(data.agostoEma)){
								data.agostoEma=0
								data.agostoEmaSuma = 0
							}
						data.agostoEma = data.agostoEma + 1
						data.agostoEmaSuma = data.agostoEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.agostoIn1)){
									data.agostoIn1=0
									data.agostoIn1Suma = 0
								}
								data.agostoIn1 = data.agostoIn1 + 1
								data.agostoIn1Suma = data.agostoIn1Suma + days
							break
							case'0002':
								if( isNaN(data.agostoIn2)){
									data.agostoIn2=0
									data.agostoIn2Suma = 0
								}
								data.agostoIn2 = data.agostoIn2 + 1
								data.agostoIn2Suma = data.agostoIn2Suma + days
							break
							case'0003':
								if( isNaN(data.agostoIn3)){
									data.agostoIn3=0
									data.agostoIn3Suma = 0
								}
								data.agostoIn3 = data.agostoIn3 + 1
								data.agostoIn3Suma = data.agostoIn3Suma + days
							break
							case'0004':
								if( isNaN(data.agostoIn4)){
									data.agostoIn4=0
									data.agostoIn4Suma = 0
								}
								data.agostoIn4 = data.agostoIn4 + 1
								data.agostoIn4Suma = data.agostoIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.agostoMo)){
							data.agostoMo=0
							data.agostoMoSuma = 0
						}
						data.agostoMo = data.agostoMo + 1
						data.agostoMoSuma = data.agostoMoSuma + days
					break
					default:					
					break
				}        		
			break
			case 8:
        		switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.septiembreEac)){
							data.septiembreEac=0
							data.septiembreEacSuma = 0
						}
						data.septiembreEac = data.septiembreEac + 1
						data.septiembreEacSuma = data.septiembreEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.septiembreEag)){
							data.septiembreEag=0
							data.septiembreEagSuma = 0
						}
						data.septiembreEag = data.septiembreEag + 1
						data.septiembreEagSuma = data.septiembreEagSuma + days
					break
					case'EC':
						if( isNaN(data.septiembreEc)){
								data.septiembreEc=0
								data.septiembreEcSuma = 0
							}
						data.septiembreEc = data.septiembreEc + 1
						data.septiembreEcSuma = data.septiembreEcSuma + days
					break
					case'EM':
						if( isNaN(data.septiembreEm)){
								data.septiembreEm=0
								data.septiembreEmSuma = 0
							}
						data.septiembreEm = data.septiembreEm + 1
						data.septiembreEmSuma = data.septiembreEmSuma + days
					break
					case'EMA':
						if( isNaN(data.septiembreEma)){
								data.septiembreEma=0
								data.septiembreEmaSuma = 0
							}
						data.septiembreEma = data.septiembreEma + 1
						data.septiembreEmaSuma = data.septiembreEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.septiembreIn1)){
									data.septiembreIn1=0
									data.septiembreIn1Suma = 0
								}
								data.septiembreIn1 = data.septiembreIn1 + 1
								data.septiembreIn1Suma = data.septiembreIn1Suma + days
							break
							case'0002':
								if( isNaN(data.septiembreIn2)){
									data.septiembreIn2=0
									data.septiembreIn2Suma = 0
								}
								data.septiembreIn2 = data.septiembreIn2 + 1
								data.septiembreIn2Suma = data.septiembreIn2Suma + days
							break
							case'0003':
								if( isNaN(data.septiembreIn3)){
									data.septiembreIn3=0
									data.septiembreIn3Suma = 0
								}
								data.septiembreIn3 = data.septiembreIn3 + 1
								data.septiembreIn3Suma = data.septiembreIn3Suma + days
							break
							case'0004':
								if( isNaN(data.septiembreIn4)){
									data.septiembreIn4=0
									data.septiembreIn4Suma = 0
								}
								data.septiembreIn4 = data.septiembreIn4 + 1
								data.septiembreIn4Suma = data.septiembreIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.septiembreMo)){
							data.septiembreMo=0
							data.septiembreMoSuma = 0
						}
						data.septiembreMo = data.septiembreMo + 1
						data.septiembreMoSuma = data.septiembreMoSuma + days
					break
					default:					
					break
				}

			break
			case 9:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.octubreEac)){
							data.octubreEac=0
							data.octubreEacSuma = 0
						}
						data.octubreEac = data.octubreEac + 1
						data.octubreEacSuma = data.octubreEacSuma + days
				
					break
					case'EAG':
						if( isNaN(data.octubreEag)){
							data.octubreEag=0
							data.octubreEagSuma = 0
						}
						data.octubreEag = data.octubreEag + 1
						data.octubreEagSuma = data.octubreEagSuma + days
					break
					case'EC':
						if( isNaN(data.octubreEc)){
								data.octubreEc=0
								data.octubreEcSuma = 0
							}
						data.octubreEc = data.octubreEc + 1
						data.octubreEcSuma = data.octubreEcSuma + days
					break
					case'EM':
						if( isNaN(data.octubreEm)){
								data.octubreEm=0
								data.octubreEmSuma = 0
							}
						data.octubreEm = data.octubreEm + 1
						data.octubreEmSuma = data.octubreEmSuma + days
					break
					case'EMA':
						if( isNaN(data.octubreEma)){
								data.octubreEma=0
								data.octubreEmaSuma = 0
							}
						data.octubreEma = data.octubreEma + 1
						data.octubreEmaSuma = data.octubreEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.octubreIn1)){
									data.octubreIn1=0
									data.octubreIn1Suma = 0
								}
								data.octubreIn1 = data.octubreIn1 + 1
								data.octubreIn1Suma = data.octubreIn1Suma + days
							break
							case'0002':
								if( isNaN(data.octubreIn2)){
									data.octubreIn2=0
									data.octubreIn2Suma = 0
								}
								data.octubreIn2 = data.octubreIn2 + 1
								data.octubreIn2Suma = data.octubreIn2Suma + days
							break
							case'0003':
								if( isNaN(data.octubreIn3)){
									data.octubreIn3=0
									data.octubreIn3Suma = 0
								}
								data.octubreIn3 = data.octubreIn3 + 1
								data.octubreIn3Suma = data.octubreIn3Suma + days
							break
							case'0004':
								if( isNaN(data.octubreIn4)){
									data.octubreIn4=0
									data.octubreIn4Suma = 0
								}
								data.octubreIn4 = data.octubreIn4 + 1
								data.octubreIn4Suma = data.octubreIn4Suma + days
							break
							default:
							
							break
						}
					break
					case'MO':
						if( isNaN(data.octubreMo)){
							data.octubreMo=0
							data.octubreMoSuma = 0
						}
						data.octubreMo = data.octubreMo + 1
						data.octubreMoSuma = data.octubreMoSuma + days
					break
					default:		
					break
				}        		
			break
			case 10:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.noviembreEac)){
							data.noviembreEac=0
							data.noviembreEacSuma = 0
						}
						data.noviembreEac = data.noviembreEac + 1
						data.noviembreEacSuma = data.noviembreEacSuma + days				
					break
					case'EAG':
						if( isNaN(data.noviembreEag)){
							data.noviembreEag=0
							data.noviembreEagSuma = 0
						}
						data.noviembreEag = data.noviembreEag + 1
						data.noviembreEagSuma = data.noviembreEagSuma + days
					break
					case'EC':
						if( isNaN(data.noviembreEc)){
								data.noviembreEc=0
								data.noviembreEcSuma = 0
							}
						data.noviembreEc = data.noviembreEc + 1
						data.noviembreEcSuma = data.noviembreEcSuma + days
					break
					case'EM':
						if( isNaN(data.noviembreEm)){
								data.noviembreEm=0
								data.noviembreEmSuma = 0
							}
						data.noviembreEm = data.noviembreEm + 1
						data.noviembreEmSuma = data.noviembreEmSuma + days
					break
					case'EMA':
						if( isNaN(data.noviembreEma)){
								data.noviembreEma=0
								data.noviembreEmaSuma = 0
							}
						data.noviembreEma = data.noviembreEma + 1
						data.noviembreEmaSuma = data.noviembreEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.noviembreIn1)){
									data.noviembreIn1=0
									data.noviembreIn1Suma = 0
								}
								data.noviembreIn1 = data.noviembreIn1 + 1
								data.noviembreIn1Suma = data.noviembreIn1Suma + days
							break
							case'0002':
								if( isNaN(data.noviembreIn2)){
									data.noviembreIn2=0
									data.noviembreIn2Suma = 0
								}
								data.noviembreIn2 = data.noviembreIn2 + 1
								data.noviembreIn2Suma = data.noviembreIn2Suma + days
							break
							case'0003':
								if( isNaN(data.noviembreIn3)){
									data.noviembreIn3=0
									data.noviembreIn3Suma = 0
								}
								data.noviembreIn3 = data.noviembreIn3 + 1
								data.noviembreIn3Suma = data.noviembreIn3Suma + days
							break
							case'0004':
								if( isNaN(data.noviembreIn4)){
									data.noviembreIn4=0
									data.noviembreIn4Suma = 0
								}
								data.noviembreIn4 = data.noviembreIn4 + 1
								data.noviembreIn4Suma = data.noviembreIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.noviembreMo)){
							data.noviembreMo=0
							data.noviembreMoSuma = 0
						}
						data.noviembreMo = data.noviembreMo + 1
						data.noviembreMoSuma = data.noviembreMoSuma + days
					break
					default:					
					break
				}        		
			break
			case 11:
				switch(reporte.siglas.trim()){
					case'EAC':
						if( isNaN(data.diciembreEac)){
							data.diciembreEac=0
							data.diciembreEacSuma = 0
						}
						data.diciembreEac = data.diciembreEac + 1
						data.diciembreEacSuma = data.diciembreEacSuma + days
					break
					case'EAG':
						if( isNaN(data.diciembreEag)){
							data.diciembreEag=0
							data.diciembreEagSuma = 0
						}	
						data.diciembreEag = data.diciembreEag + 1
						data.diciembreEagSuma = data.diciembreEagSuma + days
					break
					case'EC':
						if( isNaN(data.diciembreEc)){
								data.diciembreEc=0
								data.diciembreEcSuma = 0
							}
						data.diciembreEc = data.diciembreEc + 1
						data.diciembreEcSuma = data.diciembreEcSuma + days
					break
					case'EM':
						if( isNaN(data.diciembreEm)){
								data.diciembreEm=0
								data.diciembreEmSuma = 0
							}
						data.diciembreEm = data.diciembreEm + 1
						data.diciembreEmSuma = data.diciembreEmSuma + days
					break
					case'EMA':
						if( isNaN(data.diciembreEma)){
								data.diciembreEma=0
								data.diciembreEmaSuma = 0
							}
						data.diciembreEma = data.diciembreEma + 1
						data.diciembreEmaSuma = data.diciembreEmaSuma + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								if( isNaN(data.diciembreIn1)){
									data.diciembreIn1=0
									data.diciembreIn1Suma = 0
								}
								data.diciembreIn1 = data.diciembreIn1 + 1
								data.diciembreIn1Suma = data.diciembreIn1Suma + days
							break
							case'0002':
								if( isNaN(data.diciembreIn2)){
									data.diciembreIn2=0
									data.diciembreIn2Suma = 0
								}
								data.diciembreIn2 = data.diciembreIn2 + 1
								data.diciembreIn2Suma = data.diciembreIn2Suma + days
							break
							case'0003':
								if( isNaN(data.diciembreIn3)){
									data.diciembreIn3=0
									data.diciembreIn3Suma = 0
								}
								data.diciembreIn3 = data.diciembreIn3 + 1
								data.diciembreIn3Suma = data.diciembreIn3Suma + days
							break
							case'0004':
								if( isNaN(data.diciembreIn4)){
									data.diciembreIn4=0
									data.diciembreIn4Suma = 0
								}
								data.diciembreIn4 = data.diciembreIn4 + 1
								data.diciembreIn4Suma = data.diciembreIn4Suma + days
							break
							default:							
							break
						}
					break
					case'MO':
						if( isNaN(data.diciembreMo)){
							data.diciembreMo=0
							data.diciembreMoSuma = 0
						}
						data.diciembreMo = data.diciembreMo + 1
						data.diciembreMoSuma = data.diciembreMoSuma + days
					break
					default:		
					break
				}
			break
			default:
			break
		}
        
    });

	const dataEnero=[]
	const labelEnero=[]
	if(!isNaN(data.eneroEac)){
		dataEnero[0]= data.eneroEacSuma/data.eneroEac
		labelEnero[0] = "EAC"
	}
	if(!isNaN(data.eneroEag)){
		dataEnero[1]= data.eneroEagSuma/data.eneroEag
		labelEnero[1] = "EAG"
	}
	if(!isNaN(data.eneroEc)){
		dataEnero[2]= data.eneroEcSuma/data.eneroEc
		labelEnero[2] = "EC"
	}
	if(!isNaN(data.eneroEm)){
		dataEnero[3]= data.eneroEmSuma/data.eneroEm
		labelEnero[3] = "EM"
	}
	if(!isNaN(data.eneroEma)){
		dataEnero[4]= data.eneroEmaSuma/data.eneroEma
		labelEnero[4] = "EMA"
	}
	if(!isNaN(data.eneroIn1)){
		dataEnero[5]= data.eneroIn1Suma/data.eneroIn1
		labelEnero[5] = "IN0001"
	}
	if(!isNaN(data.eneroIn2)){
		dataEnero[6]= data.eneroIn2Suma/data.eneroIn2
		labelEnero[6] = "IN0002"
	}
	if(!isNaN(data.eneroIn3)){
		dataEnero[7]= data.eneroIn3Suma/data.eneroIn3
		labelEnero[7] = "IN0003"
	}
	if(!isNaN(data.eneroIn4)){
		dataEnero[8]= data.eneroIn4Suma/data.eneroIn4
		labelEnero[8] = "IN0004"
	}

	const dataFebrero=[]
	const labelFebrero=[]
	if(!isNaN(data.febreroEac)){
		dataFebrero[0]= data.febreroEacSuma/data.febreroEac
		labelFebrero[0] = "EAC"
	}
	if(!isNaN(data.febreroEag)){
		dataFebrero[1]= data.febreroEagSuma/data.febreroEag
		labelFebrero[1] = "EAG"
	}
	if(!isNaN(data.febreroEc)){
		dataFebrero[2]= data.febreroEcSuma/data.febreroEc
		labelFebrero[2] = "EC"
	}
	if(!isNaN(data.febreroEm)){
		dataFebrero[3]= data.febreroEmSuma/data.febreroEm
		labelFebrero[3] = "EM"
	}
	if(!isNaN(data.febreroEma)){
		dataFebrero[4]= data.febreroEmaSuma/data.febreroEma
		labelFebrero[4] = "EMA"
	}
	if(!isNaN(data.febreroIn1)){
		dataFebrero[5]= data.febreroIn1Suma/data.febreroIn1
		labelFebrero[5] = "IN0001"
	}
	if(!isNaN(data.febreroIn2)){
		dataFebrero[6]= data.febreroIn2Suma/data.febreroIn2
		labelFebrero[6] = "IN0002"
	}
	if(!isNaN(data.febreroIn3)){
		dataFebrero[7]= data.febreroIn3Suma/data.febreroIn3
		labelFebrero[7] = "IN0003"
	}
	if(!isNaN(data.febreroIn4)){
		dataFebrero[8]= data.febreroIn4Suma/data.febreroIn4
		labelFebrero[8] = "IN0004"
	}

	const dataMarzo=[]
	const labelMarzo=[]
	if(!isNaN(data.marzoEac)){
		dataMarzo[0]= data.marzoEacSuma/data.marzoEac
		labelMarzo[0] = "EAC"
	}
	if(!isNaN(data.marzoEag)){
		dataMarzo[1]= data.marzoEagSuma/data.marzoEag
		labelMarzo[1] = "EAG"
	}
	if(!isNaN(data.marzoEc)){
		dataMarzo[2]= data.marzoEcSuma/data.marzoEc
		labelMarzo[2] = "EC"
	}
	if(!isNaN(data.marzoEm)){
		dataMarzo[3]= data.marzoEmSuma/data.marzoEm
		labelMarzo[3] = "EM"
	}
	if(!isNaN(data.marzoEma)){
		dataMarzo[4]= data.marzoEmaSuma/data.marzoEma
		labelMarzo[4] = "EMA"
	}
	if(!isNaN(data.marzoIn1)){
		dataMarzo[5]= data.marzoIn1Suma/data.marzoIn1
		labelMarzo[5] = "IN0001"
	}
	if(!isNaN(data.marzoIn2)){
		dataMarzo[6]= data.marzoIn2Suma/data.marzoIn2
		labelMarzo[6] = "IN0002"
	}
	if(!isNaN(data.marzoIn3)){
		dataMarzo[7]= data.marzoIn3Suma/data.marzoIn3
		labelMarzo[7] = "IN0003"
	}
	if(!isNaN(data.marzoIn4)){
		dataMarzo[8]= data.marzoIn4Suma/data.marzoIn4
		labelMarzo[8] = "IN0004"
	}

	const dataAbril=[]
	const labelAbril=[]
	if(!isNaN(data.abrilEac)){
		dataAbril[0]= data.abrilEacSuma/data.abrilEac
		labelAbril[0] = "EAC"
	}
	if(!isNaN(data.abrilEag)){
		dataAbril[1]= data.abrilEagSuma/data.abrilEag
		labelAbril[1] = "EAG"
	}
	if(!isNaN(data.abrilEc)){
		dataAbril[2]= data.abrilEcSuma/data.abrilEc
		labelAbril[2] = "EC"
	}
	if(!isNaN(data.abrilEm)){
		dataAbril[3]= data.abrilEmSuma/data.abrilEm
		labelAbril[3] = "EM"
	}
	if(!isNaN(data.abrilEma)){
		dataAbril[4]= data.abrilEmaSuma/data.abrilEma
		labelAbril[4] = "EMA"
	}
	if(!isNaN(data.abrilIn1)){
		dataAbril[5]= data.abrilIn1Suma/data.abrilIn1
		labelAbril[5] = "IN0001"
	}
	if(!isNaN(data.abrilIn2)){
		dataAbril[6]= data.abrilIn2Suma/data.abrilIn2
		labelAbril[6] = "IN0002"
	}
	if(!isNaN(data.abrilIn3)){
		dataAbril[7]= data.abrilIn3Suma/data.abrilIn3
		labelAbril[7] = "IN0003"
	}
	if(!isNaN(data.abrilIn4)){
		dataAbril[8]= data.abrilIn4Suma/data.abrilIn4
		labelAbril[8] = "IN0004"
	}

	const dataMayo=[]
	const labelMayo=[]
	if(!isNaN(data.mayoEac)){
		dataMayo[0]= data.mayoEacSuma/data.mayoEac
		labelMayo[0] = "EAC"
	}
	if(!isNaN(data.mayoEag)){
		dataMayo[1]= data.mayoEagSuma/data.mayoEag
		labelMayo[1] = "EAG"
	}
	if(!isNaN(data.mayoEc)){
		dataMayo[2]= data.mayoEcSuma/data.mayoEc
		labelMayo[2] = "EC"
	}
	if(!isNaN(data.mayoEm)){
		dataMayo[3]= data.mayoEmSuma/data.mayoEm
		labelMayo[3] = "EM"
	}
	if(!isNaN(data.mayoEma)){
		dataMayo[4]= data.mayoEmaSuma/data.mayoEma
		labelMayo[4] = "EMA"
	}
	if(!isNaN(data.mayoIn1)){
		dataMayo[5]= data.mayoIn1Suma/data.mayoIn1
		labelMayo[5] = "IN0001"
	}
	if(!isNaN(data.mayoIn2)){
		dataMayo[6]= data.mayoIn2Suma/data.mayoIn2
		labelMayo[6] = "IN0002"
	}
	if(!isNaN(data.mayoIn3)){
		dataMayo[7]= data.mayoIn3Suma/data.mayoIn3
		labelMayo[7] = "IN0003"
	}
	if(!isNaN(data.mayoIn4)){
		dataMayo[8]= data.mayoIn4Suma/data.mayoIn4
		labelMayo[8] = "IN0004"
	}
	
	const dataJunio=[]
	const labelJunio=[]
	if(!isNaN(data.junioEac)){
		dataJunio[0]= data.junioEacSuma/data.junioEac
		labelJunio[0] = "EAC"
	}
	if(!isNaN(data.junioEag)){
		dataJunio[1]= data.junioEagSuma/data.junioEag
		labelJunio[1] = "EAG"
	}
	if(!isNaN(data.junioEc)){
		dataJunio[2]= data.junioEcSuma/data.junioEc
		labelJunio[2] = "EC"
	}
	if(!isNaN(data.junioEm)){
		dataJunio[3]= data.junioEmSuma/data.junioEm
		labelJunio[3] = "EM"
	}
	if(!isNaN(data.junioEma)){
		dataJunio[4]= data.junioEmaSuma/data.junioEma
		labelJunio[4] = "EMA"
	}
	if(!isNaN(data.junioIn1)){
		dataJunio[5]= data.junioIn1Suma/data.junioIn1
		labelJunio[5] = "IN0001"
	}
	if(!isNaN(data.junioIn2)){
		dataJunio[6]= data.junioIn2Suma/data.junioIn2
		labelJunio[6] = "IN0002"
	}
	if(!isNaN(data.junioIn3)){
		dataJunio[7]= data.junioIn3Suma/data.junioIn3
		labelJunio[7] = "IN0003"
	}
	if(!isNaN(data.junioIn4)){
		dataJunio[8]= data.junioIn4Suma/data.junioIn4
		labelJunio[8] = "IN0004"
	}

	const dataJulio=[]
	const labelJulio=[]
	if(!isNaN(data.julioEac)){
		dataJulio[0]= data.julioEacSuma/data.julioEac
		labelJulio[0] = "EAC"
	}
	if(!isNaN(data.julioEag)){
		dataJulio[1]= data.julioEagSuma/data.julioEag
		labelJulio[1] = "EAG"
	}
	if(!isNaN(data.julioEc)){
		dataJulio[2]= data.julioEcSuma/data.julioEc
		labelJulio[2] = "EC"
	}
	if(!isNaN(data.julioEm)){
		dataJulio[3]= data.julioEmSuma/data.julioEm
		labelJulio[3] = "EM"
	}
	if(!isNaN(data.julioEma)){
		dataJulio[4]= data.julioEmaSuma/data.julioEma
		labelJulio[4] = "EMA"
	}
	if(!isNaN(data.julioIn1)){
		dataJulio[5]= data.julioIn1Suma/data.julioIn1
		labelJulio[5] = "IN0001"
	}
	if(!isNaN(data.julioIn2)){
		dataJulio[6]= data.julioIn2Suma/data.julioIn2
		labelJulio[6] = "IN0002"
	}
	if(!isNaN(data.julioIn3)){
		dataJulio[7]= data.julioIn3Suma/data.julioIn3
		labelJulio[7] = "IN0003"
	}
	if(!isNaN(data.julioIn4)){
		dataJulio[8]= data.julioIn4Suma/data.julioIn4
		labelJulio[8] = "IN0004"
	}

	const dataAgosto=[]
	const labelAgosto=[]
	if(!isNaN(data.agostoEac)){
		dataAgosto[0]= data.agostoEacSuma/data.agostoEac
		labelAgosto[0] = "EAC"
	}
	if(!isNaN(data.agostoEag)){
		dataAgosto[1]= data.agostoEagSuma/data.agostoEag
		labelAgosto[1] = "EAG"
	}
	if(!isNaN(data.agostoEc)){
		dataAgosto[2]= data.agostoEcSuma/data.agostoEc
		labelAgosto[2] = "EC"
	}
	if(!isNaN(data.agostoEm)){
		dataAgosto[3]= data.agostoEmSuma/data.agostoEm
		labelAgosto[3] = "EM"
	}
	if(!isNaN(data.agostoEma)){
		dataAgosto[4]= data.agostoEmaSuma/data.agostoEma
		labelAgosto[4] = "EMA"
	}
	if(!isNaN(data.agostoIn1)){
		dataAgosto[5]= data.agostoIn1Suma/data.agostoIn1
		labelAgosto[5] = "IN0001"
	}
	if(!isNaN(data.agostoIn2)){
		dataAgosto[6]= data.agostoIn2Suma/data.agostoIn2
		labelAgosto[6] = "IN0002"
	}
	if(!isNaN(data.agostoIn3)){
		dataAgosto[7]= data.agostoIn3Suma/data.agostoIn3
		labelAgosto[7] = "IN0003"
	}
	if(!isNaN(data.agostoIn4)){
		dataAgosto[8]= data.agostoIn4Suma/data.agostoIn4
		labelAgosto[8] = "IN0004"
	}
	
	const dataSeptiembre=[]
	const labelSeptiembre=[]
	if(!isNaN(data.septiembreEac)){
		dataSeptiembre[0]= data.septiembreEacSuma/data.septiembreEac
		labelSeptiembre[0] = "EAC"
	}
	if(!isNaN(data.septiembreEag)){
		dataSeptiembre[1]= data.septiembreEagSuma/data.septiembreEag
		labelSeptiembre[1] = "EAG"
	}
	if(!isNaN(data.septiembreEc)){
		dataSeptiembre[2]= data.septiembreEcSuma/data.septiembreEc
		labelSeptiembre[2] = "EC"
	}
	if(!isNaN(data.septiembreEm)){
		dataSeptiembre[3]= data.septiembreEmSuma/data.septiembreEm
		labelSeptiembre[3] = "EM"
	}
	if(!isNaN(data.septiembreEma)){
		dataSeptiembre[4]= data.septiembreEmaSuma/data.septiembreEma
		labelSeptiembre[4] = "EMA"
	}
	if(!isNaN(data.septiembreIn1)){
		dataSeptiembre[5]= data.septiembreIn1Suma/data.septiembreIn1
		labelSeptiembre[5] = "IN0001"
	}
	if(!isNaN(data.septiembreIn2)){
		dataSeptiembre[6]= data.septiembreIn2Suma/data.septiembreIn2
		labelSeptiembre[6] = "IN0002"
	}
	if(!isNaN(data.septiembreIn3)){
		dataSeptiembre[7]= data.septiembreIn3Suma/data.septiembreIn3
		labelSeptiembre[7] = "IN0003"
	}
	if(!isNaN(data.septiembreIn4)){
		dataSeptiembre[8]= data.septiembreIn4Suma/data.septiembreIn4
		labelSeptiembre[8] = "IN0004"
	}

	const dataOctubre=[]
	const labelOctubre=[]
	if(!isNaN(data.octubreEac)){
		dataOctubre[0]= data.octubreEacSuma/data.octubreEac
		labelOctubre[0] = "EAC"
	}
	if(!isNaN(data.octubreEag)){
		dataOctubre[1]= data.octubreEagSuma/data.octubreEag
		labelOctubre[1] = "EAG"
	}
	if(!isNaN(data.octubreEc)){
		dataOctubre[2]= data.octubreEcSuma/data.octubreEc
		labelOctubre[2] = "EC"
	}
	if(!isNaN(data.octubreEm)){
		dataOctubre[3]= data.octubreEmSuma/data.octubreEm
		labelOctubre[3] = "EM"
	}
	if(!isNaN(data.octubreEma)){
		dataOctubre[4]= data.octubreEmaSuma/data.octubreEma
		labelOctubre[4] = "EMA"
	}
	if(!isNaN(data.octubreIn1)){
		dataOctubre[5]= data.octubreIn1Suma/data.octubreIn1
		labelOctubre[5] = "IN0001"
	}
	if(!isNaN(data.octubreIn2)){
		dataOctubre[6]= data.octubreIn2Suma/data.octubreIn2
		labelOctubre[6] = "IN0002"
	}
	if(!isNaN(data.octubreIn3)){
		dataOctubre[7]= data.octubreIn3Suma/data.octubreIn3
		labelOctubre[7] = "IN0003"
	}
	if(!isNaN(data.octubreIn4)){
		dataOctubre[8]= data.octubreIn4Suma/data.octubreIn4
		labelOctubre[8] = "IN0004"
	}

	const dataNoviembre=[]
	const labelNoviembre=[]
	if(!isNaN(data.noviembreEac)){
		dataNoviembre[0]= data.noviembreEacSuma/data.noviembreEac
		labelNoviembre[0] = "EAC"
	}
	if(!isNaN(data.noviembreEag)){
		dataNoviembre[1]= data.noviembreEagSuma/data.noviembreEag
		labelNoviembre[1] = "EAG"
	}
	if(!isNaN(data.noviembreEc)){
		dataNoviembre[2]= data.noviembreEcSuma/data.noviembreEc
		labelNoviembre[2] = "EC"
	}
	if(!isNaN(data.noviembreEm)){
		dataNoviembre[3]= data.noviembreEmSuma/data.noviembreEm
		labelNoviembre[3] = "EM"
	}
	if(!isNaN(data.noviembreEma)){
		dataNoviembre[4]= data.noviembreEmaSuma/data.noviembreEma
		labelNoviembre[4] = "EMA"
	}
	if(!isNaN(data.noviembreIn1)){
		dataNoviembre[5]= data.noviembreIn1Suma/data.noviembreIn1
		labelNoviembre[5] = "IN0001"
	}
	if(!isNaN(data.noviembreIn2)){
		dataNoviembre[6]= data.noviembreIn2Suma/data.noviembreIn2
		labelNoviembre[6] = "IN0002"
	}
	if(!isNaN(data.noviembreIn3)){
		dataNoviembre[7]= data.noviembreIn3Suma/data.noviembreIn3
		labelNoviembre[7] = "IN0003"
	}
	if(!isNaN(data.noviembreIn4)){
		dataNoviembre[8]= data.noviembreIn4Suma/data.noviembreIn4
		labelNoviembre[8] = "IN0004"
	}
	const dataDiciembre=[]
	const labelDiciembre=[]
	if(!isNaN(data.diciembreEac)){
		dataDiciembre[0]= data.diciembreEacSuma/data.diciembreEac
		labelDiciembre[0] = "EAC"
	}
	if(!isNaN(data.diciembreEag)){
		dataDiciembre[1]= data.diciembreEagSuma/data.diciembreEag
		labelDiciembre[1] = "EAG"
	}
	if(!isNaN(data.diciembreEc)){
		dataDiciembre[2]= data.diciembreEcSuma/data.diciembreEc
		labelDiciembre[2] = "EC"
	}
	if(!isNaN(data.diciembreEm)){
		dataDiciembre[3]= data.diciembreEmSuma/data.diciembreEm
		labelDiciembre[3] = "EM"
	}
	if(!isNaN(data.diciembreEma)){
		dataDiciembre[4]= data.diciembreEmaSuma/data.diciembreEma
		labelDiciembre[4] = "EMA"
	}
	if(!isNaN(data.diciembreIn1)){
		dataDiciembre[5]= data.diciembreIn1Suma/data.diciembreIn1
		labelDiciembre[5] = "IN0001"
	}
	if(!isNaN(data.diciembreIn2)){
		dataDiciembre[6]= data.diciembreIn2Suma/data.diciembreIn2
		labelDiciembre[6] = "IN0002"
	}
	if(!isNaN(data.diciembreIn3)){
		dataDiciembre[7]= data.diciembreIn3Suma/data.diciembreIn3
		labelDiciembre[7] = "IN0003"
	}
	if(!isNaN(data.diciembreIn4)){
		dataDiciembre[8]= data.diciembreIn4Suma/data.diciembreIn4
		labelDiciembre[8] = "IN0004"
	}

	const infoOportunidad={
		dataEnero,
		labelEnero,
		dataFebrero,
		labelFebrero,
		dataMarzo,
		labelMarzo,
		dataAbril,
		labelAbril,
		dataMayo,
		labelMayo,
		dataJunio,
		labelJunio,
		dataJulio,
		labelJulio,
		dataAgosto,
		labelAgosto,
		dataSeptiembre,
		labelSeptiembre,
		dataOctubre,
		labelOctubre,
		dataNoviembre,
		labelNoviembre,
		dataDiciembre,
		labelDiciembre,
	}

	console.log(infoOportunidad)
})
