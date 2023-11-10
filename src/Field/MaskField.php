<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MaskField
{
    public static function adapt(FieldInterface $field, array $options = []): FieldInterface
    {

        $resolver = new OptionsResolver();
        self::configureOptions($resolver);
        $options = $resolver->resolve($options);

        if (!method_exists($field, 'setFormTypeOptions')) {
            return $field;
        }

        return $field
            ->setFormTypeOptions([
                'row_attr' => [
                    'data-controller' => 'mask-field',
//                    'data-mask-field-map' => self::encodeMap($map),
                    'data-mask-field-options' => json_encode($options, JSON_THROW_ON_ERROR),
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


    public static function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefault('identifier_type', 'value');
        $resolver->setAllowedValues('identifier_type', ['label', 'value']);

        $resolver->setRequired('map');
        $resolver->setAllowedTypes('map', 'string[][]');
    }
}