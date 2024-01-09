$j('span[fld="Pscore_Legal_Suffix"]').each(function () {
	if ($j(this).text() !== '{{Pscore_Legal_Suffix}}') {
		$j(this).text(' ' + $j(this).text())
	}
})

if (rcname.includes('Day Letter')) {
	let schoolId = ~curschoolid
	$j('.att-cnt').each(function () {
		let attval = $j(this)
		if (attval.text() == 0) {
			attval.parent().remove()
		}
	})
}

if (rcname.includes('10 Day Letter')) {
	let schoolId = ~curschoolid
	if (schoolId === 101) {
		$j('.att-cnt').each(function () {
			let attval = $j(this)
			if (attval.text() < 10) {
				attval.closest('tr').next('tr').remove()
				attval.closest('tr').remove()
			}
		})
	}
}

if (rcname === 'Report Card' || rcname === 'Progress Report') {
	let actTrm = '~[prefschool:curfgname]'
	let schoolId = ~curschoolid
	let colIndx = 0

	const hideFutureCourses = trm => {
		$j('.storedGradesTable .storedGradesRow').each(function () {
			let tableRow = $j(this)
			let Q1Td = $j(this).children("td[data-term='Q1']").html()
			let Q2Td = $j(this).children("td[data-term='Q2']").html()
			let Q3Td = $j(this).children("td[data-term='Q3']").html()
			let Q4Td = $j(this).children("td[data-term='Q4']").html()
			let S1Td = $j(this).children("td[data-term='S1']").html()
			let E1Td = $j(this).children("td[data-term='S2']").html()
			let E2Td = $j(this).children("td[data-term='E1']").html()
			let S2Td = $j(this).children("td[data-term='E2']").html()
			let Y1Td = $j(this).children("td[data-term='Y1']").html()

			if (schoolId === 101) {
				let externalGrade = $j(this).not('[data-sectionid]').hide()
			}

			switch (trm) {
				case 'Q1':
					if (Q1Td == '' && (Q2Td != '' || S1Td != '' || Q3Td != '' || Q4Td != '' || S2Td != '')) {
						tableRow.hide()
					}
					break
				case 'Q2':
					if (Q2Td == '' && (Q1Td != '' || Q3Td != '' || Q4Td != '' || S2Td != '')) {
						tableRow.hide()
					}
					break
				case 'S1':
					if ((Q1Td == '' || Q2Td == '' || S1Td == '') && (Q3Td != '' || Q4Td != '' || S2Td != '')) {
						tableRow.hide()
					}
					break
				case 'Q3':
					if (schoolId == 101) {
						if (Q1Td != '' || Q2Td != '' || S1Td != '') {
							tableRow.hide()
						}
					} else {
						if (Q3Td == '' && Q4Td != '') {
							tableRow.hide()
						}
					}
					break
				case 'Q4':
					if (schoolId == 101) {
						if (Q1Td != '' || Q2Td != '' || S1Td != '') {
							tableRow.hide()
						}
					}
					break
				case 'S2':
					if (schoolId == 101) {
						if (Q1Td != '' || Q2Td != '' || S1Td != '') {
							tableRow.hide()
						}
					}
					break
			}
		})
	}

	const hideGradeColumns = trm => {
		$j(`*[data-term=${trm}]`).each(function () {
			$j(this).hide()
		})
	}

	const hideHeaders = trm => {
		$j('*[data-header-term]')
			.not(`*[data-header-term=${trm}]`)
			.each(function () {
				$j(this).hide()
			})
	}

	const hideTable = trm => {
		$j('*[data-table-term]')
			.not(`*[data-table-term=${trm}]`)
			.each(function () {
				$j(this).hide()
			})
	}

	const prHideNotTable = trm => {
		$j(`*[data-term=${trm}]`)
			.not('table')
			.each(function () {
				$j(this).hide()
			})
	}

	if (actTrm === 'Q1') {
		//hide grade columns
		hideGradeColumns('Q2')
		hideGradeColumns('Q3')
		hideGradeColumns('Q4')
		hideGradeColumns('S1')
		hideGradeColumns('S2')
		hideGradeColumns('E1')
		hideGradeColumns('E2')
		hideGradeColumns('Y1')
		hideGradeColumns('Semester')
		//hide report card headers
		hideHeaders('Q1')
		hideTable('Q1')
		hideFutureCourses('Q1')
		colIndx = 1
	} else if (actTrm === 'Q2') {
		//hide grade columns
		hideGradeColumns('Q3')
		hideGradeColumns('Q4')
		hideGradeColumns('S1')
		hideGradeColumns('S2')
		hideGradeColumns('E1')
		hideGradeColumns('E2')
		hideGradeColumns('Y1')
		hideGradeColumns('Semester')
		//hide report card headers
		hideHeaders('Q2')
		hideTable('Q2')
		hideFutureCourses('Q2')
		colIndx = 2
	} else if (actTrm === 'S1') {
		//hide grade columns
		hideGradeColumns('Q3')
		hideGradeColumns('Q4')
		hideGradeColumns('E2')
		hideGradeColumns('S2')
		hideGradeColumns('Y1')
		hideGradeColumns('Quarter')
		//hide report card headers
		hideHeaders('S1')
		hideTable('Q2')
		//change exam header text
		$j("th[data-term='E1']").text('Exam')
		hideFutureCourses('S1')
		colIndx = 2
	} else if (actTrm === 'Q3') {
		//hide grade columns
		hideGradeColumns('Q4')
		hideGradeColumns('S1')
		hideGradeColumns('S2')
		hideGradeColumns('E1')
		hideGradeColumns('E2')
		hideGradeColumns('Y1')
		hideGradeColumns('Semester')
		//hide report card headers
		hideHeaders('Q3')
		hideTable('Q3')
		hideFutureCourses('Q3')
		colIndx = 3
	} else if (actTrm === 'Q4') {
		//hide grade columns
		hideGradeColumns('S1')
		hideGradeColumns('S2')
		hideGradeColumns('E1')
		hideGradeColumns('E2')
		hideGradeColumns('Y1')
		hideGradeColumns('Semester')
		//hide report card headers
		hideHeaders('Q4')
		hideTable('Q4')
		hideFutureCourses('Q4')
		colIndx = 4
	} else if (actTrm === 'S2') {
		//hide grade columns
		hideGradeColumns('Y1')
		hideGradeColumns('Quarter')
		//hide report card headers
		hideHeaders('S2')
		hideTable('Q4')
		hideFutureCourses('S2')
		//Extra logic to get things to display the way Pius wants
		if (schoolId === 101) {
			hideGradeColumns('Q1')
			hideGradeColumns('Q2')
			hideGradeColumns('S1')
			hideGradeColumns('E1')
			$j("th[data-term='E2']").text('Exam')
		}
		colIndx = 4
	} else {
		hideGradeColumns('Quarter')
		hideGradeColumns('Semester')
		hideHeaders('Y1')
		hideTable('Q4')
		colIndx = 4
	}
	if (rcname === 'Progress Report') {
		colIndx = 0
		if (actTrm === 'Q2') {
			prHideNotTable('Q1')
			colIndx = 2
		} else if (actTrm === 'Q3') {
			prHideNotTable('Q1')
			prHideNotTable('Q2')
			colIndx = 2
		} else if (actTrm === 'Q4') {
			prHideNotTable('Q1')
			prHideNotTable('Q2')
			prHideNotTable('Q3')
			colIndx = 2
		}
	}
	// PK Language/ Literacy Grandparent display
	let langLitStandardsParent = $j('tr[parent*="PK.LL"]').parent()
	let langLitFirstParentRow = $j(langLitStandardsParent).find('tr[parent*="PK.LL"]:first')
	let clonedLangLitHeader = $j(langLitFirstParentRow).clone()[0]
	let clonedLangLitHeaderTd = $j(clonedLangLitHeader).children().first()
	$j(clonedLangLitHeaderTd).text('LANGUAGE / LITERACY')
	$j(clonedLangLitHeaderTd).removeAttr('style')
	$j(clonedLangLitHeaderTd).attr('colspan', colIndx)
	$j(langLitFirstParentRow).before(clonedLangLitHeader)

	// PK Health / Physical Development Grandparent display
	let healthStandardsParent = $j('tr[parent*="PK.H"]').parent()
	let healthFirstParentRow = $j(healthStandardsParent).find('tr[parent*="PK.H"]:first')
	let clonedHealthHeader = $j(healthFirstParentRow).clone()[0]
	let clonedHealthHeaderTd = $j(clonedHealthHeader).children().first()
	$j(clonedHealthHeaderTd).text('HEALTH / PHYSICAL DEVELOPMENT')
	$j(clonedHealthHeaderTd).removeAttr('style')
	$j(clonedHealthHeaderTd).attr('colspan', colIndx)
	$j(healthFirstParentRow).before(clonedHealthHeader)

	// Kindergarten Math Grandparent display
	let mathStandardsParent = $j('tr[parent*="K.M"][parent!="PK.M"]').parent()
	let mathFirstParentRow = $j(mathStandardsParent).find('tr[parent*="K.M"][parent!="PK.M"]:first')
	let clonedMathHeader = $j(mathFirstParentRow).clone()[0]
	let clonedMathHeaderTd = $j(clonedMathHeader).children().first()
	$j(clonedMathHeaderTd).text('MATH')
	$j(clonedMathHeaderTd).removeAttr('style')
	$j(clonedMathHeaderTd).attr('colspan', colIndx)
	$j(mathFirstParentRow).before(clonedMathHeader)

	// Kindergarten Reading Grandparent display
	let readStandardsParent = $j('tr[parent*="K.RD"]').parent()
	let readFirstParentRow = $j(readStandardsParent).find('tr[parent*="K.RD"]:first')
	let clonedReadHeader = $j(readFirstParentRow).clone()[0]
	let clonedReadHeaderTd = $j(clonedReadHeader).children().first()
	$j(clonedReadHeaderTd).text('READING')
	$j(clonedReadHeaderTd).removeAttr('style')
	$j(clonedReadHeaderTd).attr('colspan', colIndx)
	$j(readFirstParentRow).before(clonedReadHeader)

	// Kindergarten Writing Grandparent display
	let writeStandardsParent = $j('tr[parent*="K.W"]').parent()
	let writeFirstParentRow = $j(writeStandardsParent).find('tr[parent*="K.W"]:first')
	let clonedWriteHeader = $j(writeFirstParentRow).clone()[0]
	let clonedWriteHeaderTd = $j(clonedWriteHeader).children().first()
	$j(clonedWriteHeaderTd).text('WRITING')
	$j(clonedWriteHeaderTd).removeAttr('style')
	$j(clonedWriteHeaderTd).attr('colspan', colIndx)
	$j(writeFirstParentRow).before(clonedWriteHeader)
}
