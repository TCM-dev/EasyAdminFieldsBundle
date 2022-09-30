<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;

class MaskField
{
    public static function adapt(FieldInterface $field, array $map = []): FieldInterface
    {
        if (!method_exists($field, 'setFormTypeOptions')) {
            return $field;
        }

        return $field
            ->setFormTypeOptions([
                'row_attr' => [
                    'data-controller' => 'mask-field',
                    'data-mask-field-map' => self::encodeMap($map)
                ],
            ]);
    }

    public static function encodeMap(array $map)
    {
        $mapElementArray = [];

        foreach ($map as $key => $fields) {
            $mapElementArray[] = [
                'value' => $key,
                'fields' => $fields
            ];
        }

        return json_encode($mapElementArray, JSON_THROW_ON_ERROR);
    }
}