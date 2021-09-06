import React from 'react';
function buildFormData (formData,employee,parentKey){
    if (employee && typeof employee === 'object' && !(employee instanceof Date) && !(employee instanceof File)) {
        Object.keys(employee).forEach(key => {
          buildFormData(formData, employee[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = employee == null ? '' : data;
    
        formData.append(parentKey, value);
      }
}
export default buildFormData;