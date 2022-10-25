<?php

namespace Insitaction\EasyAdminFieldsBundle\Utils;

use Symfony\Component\PropertyAccess\PropertyAccess;
use function Symfony\Component\Translation\t;

class ChoiceUtils
{
    public static function mapArrayToTranslatableChoices($choices, $keyProperty = 'key', $labelProperty = 'label'): array
    {
        $translatableChoices = [];

        $propertyAccessor = PropertyAccess::createPropertyAccessor();

        foreach ($choices as $choice) {
            $key = $propertyAccessor->getValue($choice, $keyProperty);
            $label = $propertyAccessor->getValue($choice, $labelProperty);
            $translatableChoices[$key] = t($label);
        }

        return $translatableChoices;
    }
}