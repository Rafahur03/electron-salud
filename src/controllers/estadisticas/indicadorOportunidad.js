const {consultarEstadisticaOportunidad}  = require('../../bd/bd.js')
 
 
document.addEventListener('DOMContentLoaded', async()=>{
    const oportunidad = await consultarEstadisticaOportunidad()
	console.log(oportunidad)
    let data =[]

    oportunidad.forEach(reporte => {

     	const fechaReporte =  new Date(reporte.fechareporte)
		const fechaSolicitud = new Date (reporte.fecha_solicitud)
		let diferencia= Math.abs(fechaReporte-fechaSolicitud);
		let days = diferencia/(1000 * 3600 * 24)
		
        
    	switch (fechaReporte.getMonth()){
        	case 0:
        		switch(reporte.siglas.trim()){
					case'EAC':
						data[0][1] = data[0][1]++
						data[0][2] = data[0][2] + days
					break
					case'EAG':
						data[0][3] = data[0][3]++
						data[0][4] = data[0][4] + days
					break
					case'EC':
						data[0][5] = data[0][5]++
						data[0][6] = data[0][6] + days
					break
					case'EM':
						data[0][7] = data[0][7]++
						data[0][8] = data[0][8] + days
					break
					case'EMA':
						data[0][9] = data[0][9]++
						data[0][10] = data[0][10] + days
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								data[0][11] = data[0][11]++
								data[0][12] = data[0][12] + days
							break
							case'0002':
								data[0][13] = data[0][13]++
								data[0][14] = data[0][14] + days
							break
							case'0003':
								data[0][15] = data[0][15]++
								data[0][16] = data[0][16] + days
							break
							case'0004':
								data[0][17] = data[0][17]++
								data[0][18] = data[0][18] + days
							break
							default:
							
							break
						}
					break
					case'MO':
						data[0][19] = data[0][19]++
						data[0][20] = data[0][20] + days
					break
					default:
					
					break
				}

			break
			case 1:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
					
					break
					default:
						
					break
				}

			break

			case 2:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break

			case 3:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
							
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
								
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break

			case 4:
        		switch(reporte.siglas.trim()){
					case'EAC':
					
					break
					case'EAG':
						
					case'EC':
						
					break
					case'EM':
					
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break

			case 5:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
							
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
					
					break
				}

			break

			case 6:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break
			
			case 7:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break
			case 8:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
								
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break

			case 9:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
								
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break

			case 10:
        		switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							
							break
						}
					break
					case'MO':
						
					break
					default:
						
					break
				}

			break
			case 11:
				switch(reporte.siglas.trim()){
					case'EAC':
						
					break
					case'EAG':
						
					break
					case'EC':
						
					break
					case'EM':
						
					break
					case'EMA':
						
					break
					case'IN':
						switch(reporte.consecutivo_interno){
							case'0001':
								
							break
							case'0002':
								
							break
							case'0003':
								
							break
							case'0004':
								
							break
							default:
							break
						}
					break
					case'MO':
						
					break
					default:
					
					break
				}

			break
			default:
			break
		}
        
    });

	console.log(EAC, EACenero)
	console.log(data)
})
 
 
