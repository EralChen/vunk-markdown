function*i(e){switch(e.type){case"object-id":case"unique-id-simple":return void(yield e.fieldName);case"unique-id-composite":return void(yield*e.fieldNames)}}export{i as e};
